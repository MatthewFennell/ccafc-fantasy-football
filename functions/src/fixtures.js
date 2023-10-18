const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const config = functions.config();

const generateFixture = (teamOne, result, teamTwo, location, league, time, isMen) => {
    if (teamOne && teamOne.length > 2 && teamTwo && teamTwo.length > 2) {
        if (result === '') {
            return {
                teamOne, result, teamTwo, location, time, completed: false, isMen
            };
        }
        return {
            teamOne, result, teamTwo, location, time, completed: true, isMen
        };
    }
    return null;
};

const generateLeagueFixtures = (list, league, isMen) => {
    const fixtures = [];
    for (let x = 0; x < list.length; x += 6) {
        fixtures.push(
            generateFixture(list[x], list[x + 1], list[x + 2], list[x + 3], league, list[x+5], isMen)
        ); // team1, result, team2, location, league, date
    }
    return fixtures.filter(x => x !== null).map(x => ({ ...x, league, isCup: false }));
};

const generateCupFixtures = (list, league, isMen) => {
    const fixtures = [];
    for (let x = 0; x < list.length; x += 6) {
        fixtures.push(
            generateFixture(list[x + 1], list[x + 2], list[x + 3], list[x + 4], list[x + 5], isMen)
        );
    }
    return fixtures.filter(x => x !== null).map(x => ({ ...x, league, isCup: true }));
};

const transformHtml = (html, isMen) => {
    const $ = cheerio.load(html);
    const arr = [];

    const format = 'not cup'

    const league = $('h2').text().replace('Details for ', '').split(' (20')[0]

    $('div[id="collapse-fixtures-list"]').find('td').each((_, el) => {
        const item = $(el).text();
        arr.push(item.trim().trimStart().trimEnd().replace(/(\r\n|\n|\r)/gm, '')
            .replace(/\s\s+/g, ' '));
      });

      return format === 'Knockout' ? generateCupFixtures(arr, league, isMen) : generateLeagueFixtures(arr, league, isMen);
};

const generateAllFixtures = () => common.getCorrectYear(db).collection('divisions').doc(constants.divisionsId).get()
    .then(divisions => {
        if (!divisions.exists) {
            throw new functions.https.HttpsError('invalid-argument', 'Divisions don\'t exist');
        }
        const mensLeagueFixtures = divisions.data().Divisions.filter(div => div.isMen).map(div => div.link);
        const womensLeagueFixtures = divisions.data().Divisions.filter(div => !div.isMen).map(div => div.link);

        const promises = mensLeagueFixtures.map(leagueUrl => axios.get(leagueUrl));
        return Promise.all(promises)
            .then(mensResult => mensResult.reduce((prev, cur) => prev.concat(transformHtml(cur.data, true)), [])).then(mensResults => {
                const promisesWomen = womensLeagueFixtures.map(leagueUrl => axios.get(leagueUrl));
                return Promise.all(promisesWomen)
                    .then(womensResult => mensResults.concat(womensResult.reduce((prev, cur) => prev.concat(transformHtml(cur.data, false)), [])));
            });
    });

exports.scheduledFirestoreExport = functions.region(constants.region).pubsub
    .schedule('every 24 hours')
    .onRun(() => generateAllFixtures().then(fixtures => common.getCorrectYear(db).collection('fixtures-blob').doc(constants.fixturesBlobId).get()
        .then(doc => {
            if (doc.exists) {
                return common.getCorrectYear(db).collection('fixtures-blob').doc(constants.fixturesBlobId).update({
                    blob: JSON.stringify(fixtures)
                });
            }
            return common.getCorrectYear(db).collection('fixtures-blob').doc(constants.fixturesBlobId).set({
                blob: JSON.stringify(fixtures)
            });
        })));

exports.findFixtures = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('fixtures-blob').doc(constants.fixturesBlobId).get()
            .then(doc => {
                if (doc.exists) {
                    const { blob } = doc.data();
                    return JSON.parse(blob);
                }
                return [];
            });
    });

exports.setMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.team || !data.team.includes(config.league.name)) {
            common.log(context.auth.uid, 'Invalid team set',
                { RequestedTeam: data.team, ConfigTeamValue: config.league.name });
            throw new functions.https.HttpsError('invalid-argument', 'Please select a valid team');
        }

        return common.getCorrectYear(db).collection('users-teams').doc(context.auth.uid).set({
            team: data.team
        });
    });

exports.getMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return common.getCorrectYear(db).collection('users-teams').doc(context.auth.uid).get()
            .then(
                doc => {
                    if (doc.exists) {
                        return doc.data().team || 'No team set';
                    }
                    return 'No team set';
                }
            );
    });
