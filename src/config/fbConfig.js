import firebase from 'firebase';
import 'firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyArktv4W770vR8c1hOJaOH7WyQBqSKOnWY',
    authDomain: 'collingwood-fantasy.firebaseapp.com',
    databaseURL: 'https://collingwood-fantasy.firebaseio.com',
    projectId: 'collingwood-fantasy',
    storageBucket: 'collingwood-fantasy.appspot.com',
    messagingSenderId: '575173597017',
    appId: '1:575173597017:web:7e80762308873758d65e48'
});

const rsf = new ReduxSagaFirebase(firebaseApp);
rsf.region = 'europe-west2';

firebaseApp.firestore();

export { firebaseApp };
export default rsf;
