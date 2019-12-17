import firebase from 'firebase';
import 'firebase/firestore';
import ReduxSagaFirebase from 'redux-saga-firebase';

console.log('env stuff', process.env);


const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDU5vZfbt0_5aR7BgZxjD32ZvrtwBonbHI',
    authDomain: 'ccafc-fantasy-football.firebaseapp.com',
    databaseURL: 'https://ccafc-fantasy-football.firebaseio.com',
    projectId: 'ccafc-fantasy-football',
    storageBucket: 'ccafc-fantasy-football.appspot.com',
    messagingSenderId: '568615767647',
    appId: '1:568615767647:web:814ed56750d0f56cf4d5ea',
    measurementId: 'G-24WBM4W3B1'
});
const rsf = new ReduxSagaFirebase(firebaseApp);
rsf.region = 'europe-west2';
firebaseApp.firestore();
export { firebaseApp };
export default rsf;
