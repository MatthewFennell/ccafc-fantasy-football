const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');
const constants = require('./constants');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://learning-backups';

exports.scheduledFirestoreExport = functions.region(constants.region).pubsub
    .schedule('every 24 hours')
    .onRun(() => {
        const databaseName = client.databasePath(process.env.GCP_PROJECT, '(default)');

        return client.exportDocuments({
            name: databaseName,
            outputUriPrefix: bucket,
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


// database import / export - https://firebase.google.com/docs/firestore/manage-data/export-import
// regular exports - https://firebase.google.com/docs/firestore/solutions/schedule-export
// https://console.cloud.google.com/cloudscheduler?authuser=1&project=ccafc-fantasy-football
