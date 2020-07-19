const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');
const constants = require('./constants');

const client = new firestore.v1.FirestoreAdminClient();
const bucket = 'gs://daily-backup-ccafc-fantasy-football';

exports.scheduledFirestoreExport = functions.region(constants.region).pubsub
    .schedule('every 24 hours')
    .onRun(() => {
        const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
        const databaseName = client.databasePath(projectId, '(default)');

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

// Buckets saved here -- https://console.cloud.google.com/storage/browser?project=ccafc-fantasy-football-dev

// database import / export - https://firebase.google.com/docs/firestore/manage-data/export-import
// regular exports - https://firebase.google.com/docs/firestore/solutions/schedule-export
// Remember to add the roles to the service acccount
// https://console.cloud.google.com/cloudscheduler?authuser=1&project=ccafc-fantasy-football

// This command exported the current firestore data into a GCP bucket named <facebook-users-test-data>
// gcloud firestore export gs://facebook-users-test-data

// Run this from https://console.cloud.google.com/home/dashboard?project=ccafc-fantasy-football-dev&cloudshell=true
// To import the test data back -
// gcloud config set project ccafc-fantasy-football-dev
// gcloud firestore import gs://facebook-users-test-data/2020-07-15T18:00:00_24068/

// Current rule - backup every day
// After 7 days, backup is moved to nearline
// After 30 days, backup is deleted

// So will have 30 backups alive at once max

// fantasypassword for all dummy accounts
