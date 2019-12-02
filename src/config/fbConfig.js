import firebase from 'firebase';
import 'firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyA_oqX4Wj8xprCRliJ0NOtgwR4E4Kj4Bl8',
    authDomain: 'testing-deployments.firebaseapp.com',
    databaseURL: 'https://testing-deployments.firebaseio.com',
    projectId: 'testing-deployments',
    storageBucket: 'testing-deployments.appspot.com',
    messagingSenderId: '588545824697',
    appId: '1:588545824697:web:d83d72fb0e357513d90868',
    measurementId: 'G-WXKBDVSK5D'
});

const rsf = new ReduxSagaFirebase(firebaseApp);
rsf.region = 'europe-west2';

firebaseApp.firestore();

export { firebaseApp };
export default rsf;
