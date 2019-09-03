const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });

admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
const db = admin.firestore();

exports.ping = functions
  .region('europe-west2')
  .https.onRequest((request, response) => {
    cors(request, response, () => {
      response.json({
        pong: request.query.ping
      });
    });
  });

exports.addMessage = functions
  .region('europe-west2')
  .https.onCall((data, context) => {
    // Message text passed from the client.
    const { text } = data;
    // Authentication / user information is automatically added to the request.
    const { uid } = context.auth;
    const name = context.auth.token.name || null;
    const picture = context.auth.token.picture || null;
    const email = context.auth.token.email || null;

    return {
      firstNumber: 5,
      secondNumber: 6,
      operator: '+',
      operationResult: 5 + 6
    };
  });

exports.test = functions
  .region('europe-west2')
  .https.onCall((request, response) => {
    cors(request, response, () => {
      response.json({
        pong: request.query.ping
      });
    });
  });

exports.getDatabase = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('projects')
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data())));

exports.addCity = functions
  .region('europe-west2')
  .https.onCall((data, context) => db
    .collection('cities')
    .add({
      name: 'Tokyo',
      country: 'Japan'
    })
    .then(docRef => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(error => {
      console.error('Error adding document: ', error);
    }));

exports.userSignUp = functions
  .region('europe-west2')
  .auth.user()
  .onCreate(user => {
    const userObject = {
      displayName: user.displayName,
      email: user.email
    };
    // If Facebook provider, assume the email is verified
    return db.doc(`users/${user.uid}`).set(userObject).then(() => (user.providerData.length
      && user.providerData[0].providerId === 'facebook.com' ? admin.auth().updateUser(user.uid, {
        emailVerified: true
      }) : false));
  });

exports.league = require('./src/leagues');

// export { functions, db };
