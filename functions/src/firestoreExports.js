const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = require('@google-cloud/firestore');
const constants = require('./constants');
const common = require('./common');

const config = functions.config();

const db = admin.firestore();

const client = new firestore.v1.FirestoreAdminClient();
const bucket = college => `gs://daily-backup-${college}-fantasy-football`;

exports.scheduledFirestoreExport = functions.region(constants.region).pubsub
    .schedule('every 24 hours')
    .onRun(() => {
        const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
        const databaseName = client.databasePath(projectId, '(default)');

        return client.exportDocuments({
            name: databaseName,
            outputUriPrefix: bucket(config.bucket.name),
            // Leave collectionIds empty to export all collections
            // or set to a list of collection IDs to export,
            // collectionIds: ['users', 'posts']
            collectionIds: []
        })
            .then(responses => {
                const response = responses[0];
                console.log(`Operation Name: ${response.name}`);
                return response;
            })
            .catch(err => {
                console.error(err);
                throw new Error('Export operation failed');
            });
    });

// Buckets saved here -- https://console.cloud.google.com/storage/browser?project=ccafc-fantasy-football

// database import / export - https://firebase.google.com/docs/firestore/manage-data/export-import
// regular exports - https://firebase.google.com/docs/firestore/solutions/schedule-export
// Remember to add the roles to the service acccount
// https://console.cloud.google.com/cloudscheduler?authuser=1&project=ccafc-fantasy-football

// This command exported the current firestore data into a GCP bucket named <facebook-users-test-data>
// gcloud firestore export gs://facebook-users-test-data
// gcloud firestore export gs://nick-test-data

// Run this from https://console.cloud.google.com/home/dashboard?project=ccafc-fantasy-football-dev&cloudshell=true
// To import the test data back -
// gcloud config set project ccafc-fantasy-football-dev
// gcloud firestore import gs://facebook-users-test-data/2020-07-15T18:00:00_24068/

// Current rule - backup every day
// After 7 days, backup is moved to nearline
// After 30 days, backup is deleted

// So will have 30 backups alive at once max

// fantasypassword for all dummy accounts

// cron timetable
// *               *               *                        *               *
// min (0-59)      hour (0-23)     day of month (1-31)      month (1-12)    day of week (0-6) (Sun - Sat??)

// run this on the 1st August every year - synced with the common.getCorrectYear
exports.rollOverToNextYear = functions.region(constants.region).pubsub
    .schedule('5 1 2 8 *').timeZone('Europe/London')
    .onRun(() => common.getCorrectYear(db).collection('leagues').doc(constants.collingwoodLeagueId).set({
        owner: 'owner',
        start_week: 0,
        name: config.league.name,
        number_of_users: 0,
        inactiveUsers: 0
    })
        .then(() => common.getPreviousYear(db).collection('users').get().then(users => {

            // Update total number of years
            db.collection('fantasy-years').doc(constants.numberOfYearsId).update({
                years: operations.arrayUnion(String(new Date().getFullYear()))
            })

            const usersToUse = users.docs.filter(user => user.data().total_points > 0);

            common.getCorrectYear(db).collection('application-info').doc(constants.applicationInfoId).set({
                total_weeks: 0,
                number_of_users: usersToUse.length,
                disabledPages: ['Features', 'Highlights']
            });

            usersToUse.map((user, index) => {
                common.getCorrectYear(db).collection('users').doc(user.id).set({
                    ...user.data(),
                    total_points: 0,
                    remaining_transfers: 0,
                    remaining_budget: 100
                });
                common.getCorrectYear(db).collection('leagues-points').add({
                    league_id: constants.collingwoodLeagueId,
                    user_id: user.id,
                    start_week: 0,
                    name: config.league.name,
                    user_points: 0,
                    username: user.data().displayName,
                    position: index + 1,
                    teamName: user.data().teamName
                });

                if (user.data().email === config.admin.email) {
                    common.getCorrectYear(db).collection('users-with-roles').doc(user.id).set({
                        displayName: user.data().displayName,
                        email: user.data().email,
                        roles: [constants.ROLES.ADMIN]
                    });
                }
            });
        })
            .then(() => common.getPreviousYear(db).collection('users-with-roles').get().then(roles => {
                roles.docs.map(role => {
                    common.getCorrectYear(db).collection('users-with-roles').add({
                        displayName: role.data().displayName,
                        email: role.data().email,
                        roles: role.data().roles
                    });
                });
            }))));

// https://console.cloud.google.com/cloudscheduler?project=ccafc-fantasy-football

// nvm list
// nvm use 12.14.1 or 10.13.0 or 16.16.0
// nvm install 16.16.0
// need 10.13.0 to run app
// use 16.16.0 for deployment
