const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

exports.findFixtures = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        const generateFixture = (teamOne, result, teamTwo, location, time) => {
            if (teamOne && teamOne.length > 2 && teamTwo && teamTwo.length > 2) {
                if (result === 'vs') {
                    return {
                        teamOne, result, teamTwo, location, time, completed: false
                    };
                }
                return {
                    teamOne, result, teamTwo, location, time, completed: true
                };
            }
            return null;
        };

        const generateFixtures = (list, league) => {
            const fixtures = [];
            for (let x = 0; x < list.length; x += 5) {
                fixtures.push(
                    generateFixture(list[x], list[x + 1], list[x + 2], list[x + 3], list[x + 4])
                );
            }
            return fixtures.filter(x => x !== null).map(x => ({ ...x, league }));
        };

        const transformHtml = html => {
            const $ = cheerio.load(html);
            const arr = [];

            const splitLeague = $('h3').text().split('-');
            const league = splitLeague.length > 1 ? splitLeague[1].trimLeft() : null;

            $('td').each((i, el) => {
                const item = $(el).text();
                arr.push(item.trim().trimLeft().trimRight().replace(/(\r\n|\n|\r)/gm, '')
                    .replace(/\s\s+/g, ' '));
            });
            const fixtures = generateFixtures(arr, league);
            return fixtures;
        };

        const promises = constants.leaguesForFixtures.map(leagueUrl => axios.get(leagueUrl));

        return Promise.all(promises)
            .then(result => result.reduce((prev, cur) => prev.concat(transformHtml(cur.data)), []));
    });


exports.setMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);

        if (!data.team || !data.team.includes('Collingwood')) {
            throw new functions.https.HttpsError('invalid-argument', 'Please select a valid team');
        }

        return db.collection('users-teams').doc(context.auth.uid).set({
            team: data.team
        });
    });

exports.getMyTeam = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return db.collection('users-teams').doc(context.auth.uid).get().then(
            doc => {
                if (doc.exists) {
                    return doc.data().team || 'No team set';
                }
                return 'No team set';
            }
        );
    });
