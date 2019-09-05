const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

exports.createLeague = functions
  .region('europe-west2')
  .https.onCall((data, context) => (data.leagueName.length ? db
    .collection('leagues')
    .add({
      name: 'league',
      leagueName: data.leagueName,
      owner: context.auth.uid,
      participants: [{
        user_id: context.auth.uid,
        username: context.auth.username || 'username',
        points: 0
      }],
      user_ids: [context.auth.uid]
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    }) : false));

exports.getAllLeagues = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))));

exports.getLeaguesIAmIn = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues')
    .where('user_ids', 'array-contains', context.auth.uid)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))));


exports.addUserToLeague = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues')
    .doc(data.leagueId)
    .update({ user_ids: admin.firestore.FieldValue.arrayUnion(context.auth.uid) }));
