import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCq0EJ8pclY1KsGjSUjHKQKCZwF7geoJX8",
  authDomain: "marioplan-d6d16.firebaseapp.com",
  databaseURL: "https://marioplan-d6d16.firebaseio.com",
  projectId: "marioplan-d6d16",
  storageBucket: "marioplan-d6d16.appspot.com",
  messagingSenderId: "912910368222",
  appId: "1:912910368222:web:716e2d7a9d5f4022"
});

const rsf = new ReduxSagaFirebase(firebaseApp);
rsf.region = "europe-west2";

firebaseApp.firestore();

export { firebaseApp };
export default rsf;
