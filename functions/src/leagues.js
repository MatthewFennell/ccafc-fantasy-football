const admin = require('firebase-admin');
const functions = require('firebase-functions');

const db = admin.firestore();

// exports.createLeague = functions
//   .region('europe-west2')
//   .https.onCall((data, context) => (data.leagueName.length ? db
//     .collection('leagues')
//     .add({
//       league_name: data.leagueName,
//       owner: context.auth.uid,
//       start_week: 0,
//       user: context.auth.uid,
//       user_points: 0
//     })
//     .catch(error => {
//       console.error('Error adding document: ', error);
//     }) : false));

exports.createLeague = functions
  .region('europe-west2')
  .https.onCall((data, context) => (data.leagueName.length ? db
    .collection('leagues')
    .add({
      owner: context.auth.uid,
      start_week: 0,
      name: data.leagueName
    }).then(docRef => {
      db.collection('leagues-points').add({
        league_id: docRef.id,
        user_id: context.auth.uid,
        start_week: 0,
        name: data.leagueName,
        user_points: 0
      });
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    }) : false));

exports.getAllLeagues = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues-points')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))));

exports.getLeaguesIAmIn = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('leagues-points')
    .where('user_id', '==', context.auth.uid)
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => ({ data: doc.data(), id: doc.id }))));


// First check if they are already in that league
// Then check that the league does exist
exports.addUserToLeague = functions
  .region('europe-west2')
  .https.onCall((data, context) => {
    const leagueRef = db.collection('leagues').doc(data.leagueId);
    const alreadyExistsRef = db.collection('leagues-points')
      .where('league_id', '==', data.leagueId)
      .where('user_id', '==', context.auth.uid);

    return alreadyExistsRef.get().then(doc => (doc.empty ? leagueRef.get()
      .then(leagueDoc => (leagueDoc.exists ? db.collection('leagues-points')
        .add({
          league_id: data.leagueId,
          user_id: context.auth.uid,
          start_week: 0,
          name: leagueDoc.data().name,
          user_points: 0
        }) : false)) : false
      .catch(error => console.log('error', error))
    )).catch(err => console.log('err', err));
  });
