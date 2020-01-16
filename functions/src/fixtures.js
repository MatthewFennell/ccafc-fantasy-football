const admin = require('firebase-admin');
const functions = require('firebase-functions');
const axios = require('axios');
const cheerio = require('cheerio');
const common = require('./common');
const constants = require('./constants');

const db = admin.firestore();

const operations = admin.firestore.FieldValue;

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

        const temp = 'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=19';
        const temp2 = 'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=20';
        const temp3 = 'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=21';
        const temp4 = 'https://www.dur.ac.uk/teamdurham/participation/collegesport/league/?league=22';
        const prem = 'https://www.teamdurham.com/collegesport/league/?league=19';
        const div1 = 'https://www.teamdurham.com/collegesport/league/?league=20';
        const div2 = 'https://www.teamdurham.com/collegesport/league/?league=21';
        const div3 = 'https://www.teamdurham.com/collegesport/league/?league=22';
        const div4 = 'https://www.teamdurham.com/collegesport/league/?league=23';
        const div5 = 'https://www.teamdurham.com/collegesport/league/?league=24';
        const div6 = 'https://www.teamdurham.com/collegesport/league/?league=77';

        // const promises = [
        //     axios.get(prem), axios.get(div1), axios.get(div2), axios.get(div3),
        //     axios.get(div4), axios.get(div5), axios.get(div6)
        // ];
        const promises = [
            axios.get(temp), axios.get(temp2), axios.get(temp3)
        ];

        return Promise.all(promises)
            .then(result => result.reduce((prev, cur) => prev.concat(transformHtml(cur.data)), []));
    });
