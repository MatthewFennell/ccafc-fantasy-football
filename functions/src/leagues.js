const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

exports.createLeague = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues')
    .add({
      name: 'league',
      leagueName: data.leagueName,
      owner: context.auth.uid
    })
    .then(docRef => {
      db.collection('leagues').doc(docRef.id).collection('participants').add({
        name: 'Somebody'
      });
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    }));

exports.getLeagues = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data())));

