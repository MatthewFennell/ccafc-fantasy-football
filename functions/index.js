const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

admin.initializeApp(functions.config().firebase);

const settings = { timestampsInSnapshots: true };
admin.firestore().settings(settings);
const db = admin.firestore();

exports.ping = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    response.json({
      pong: request.query.ping
    });
  });
});

exports.addMessage = functions.https.onCall((data, context) => {
  // Message text passed from the client.
  const text = data.text;
  // Authentication / user information is automatically added to the request.
  const uid = context.auth.uid;
  const name = context.auth.token.name || null;
  const picture = context.auth.token.picture || null;
  const email = context.auth.token.email || null;
  console.log("data", data);
  console.log("context", context);

  return {
    firstNumber: 5,
    secondNumber: 6,
    operator: "+",
    operationResult: 5 + 6
  };
});

exports.test = functions.https.onCall((request, response) => {
  cors(request, response, () => {
    response.json({
      pong: request.query.ping
    });
  });
});

exports.getDatabase = functions.https.onCall((data, context) => {
  return db
    .collection("projects")
    .get()
    .then(querySnapshot => querySnapshot.docs.map(doc => doc.data()));
});

exports.addCity = functions.https.onCall((data, context) => {
  return db
    .collection("cities")
    .add({
      name: "Tokyo",
      country: "Japan"
    })
    .then(docRef => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });
});

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  const userObject = {
    displayName: user.displayName,
    email: user.email
  };

  return db.doc("users/" + user.uid).set(userObject);
});
