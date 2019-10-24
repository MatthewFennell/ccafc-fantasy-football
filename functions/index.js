const admin = require('firebase-admin');
const functions = require('firebase-functions');
const fp = require('lodash/fp');
const lodash = require('lodash');
const constants = require('./src/constants');
const common = require('./src/common');

const config = functions.config();

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

exports.auth = require('./src/auth');
exports.league = require('./src/leagues');
exports.team = require('./src/teams');
exports.player = require('./src/players');
exports.activeTeam = require('./src/activeTeam');
exports.weeklyTeam = require('./src/weeklyTeams');
exports.points = require('./src/points');
exports.users = require('./src/users');
exports.listeners = require('./src/listeners');
exports.onSignUp = require('./src/onSignUp');
exports.on = require('./src/onDelete');

const operations = admin.firestore.FieldValue;

exports.deleteUser = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        return admin.auth().getUser(context.auth.uid).then(user => {
            if (user.email === data.email) {
                return admin.auth().deleteUser(context.auth.uid).then(
                    () => db.collection('users').doc(context.auth.uid).delete()
                );
            }
            throw new functions.https.HttpsError('not-found', 'That is not your email');
        });
    });


exports.orderedUsers = functions
    .region(constants.region)
    .https.onCall((data, context) => {
        common.isAuthenticated(context);
        if (!common.isIntegerGreaterThanEqualZero(data.week)) {
            throw new functions.https.HttpsError('invalid-argument', `Invalid week of${data.week}`);
        }

        const adaptData = query => query.get()
            .then(querySnapshot => querySnapshot.docs
                .map(doc => ({ data: doc.data(), id: doc.id })))
            .then(result => {
                const leaguePromises = [];
                result.map(user => leaguePromises.push(db.collection('weekly-teams').where('user_id', '==', user.data.user_id).where('week', '==', data.week)
                    .get()
                    .then(weeklyTeam => {
                        if (weeklyTeam.size > 1) {
                            throw new functions.https.HttpsError('invalid-argument', 'Somehow you have multiple weekly teams');
                        }
                        if (weeklyTeam.size === 0) {
                            return fp.set('data.week_points', 0)(user);
                        }
                        const weeklyTeamObj = weeklyTeam.docs[0];
                        return fp.set('data.week_points', weeklyTeamObj.data().points)(user);
                    })));
                return Promise.all(leaguePromises).then(leagueRow => leagueRow);
            });

        if (data.previousId === null) {
            return adaptData(db
                .collection('leagues-points')
                .where('league_id', '==', data.leagueId)
                .orderBy('position', 'asc')
                .limit(Math.min(20, data.requestedSize)));
        }
        return db.collection('leagues-points').doc(data.previousId).get().then(
            query => adaptData(db
                .collection('leagues-points')
                .where('league_id', '==', data.leagueId)
                .orderBy('position', 'asc')
                .startAfter(query)
                .limit(Math.min(20, data.requestedSize)))
        );
    });
