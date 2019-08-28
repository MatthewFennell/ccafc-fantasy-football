const functions = require("firebase-functions").region("europe-west2");

exports.helloWorld = functions
  .region("europe-west2")
  .https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
  });
