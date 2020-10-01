import * as firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyASlzY28VU4kyofRvwoS_7q_Y9Cy2F_Les",
    authDomain: "jegty-a863a.firebaseapp.com",
    databaseURL: "https://jegty-a863a.firebaseio.com",
    projectId: "jegty-a863a",
    storageBucket: "jegty-a863a.appspot.com",
    messagingSenderId: "760195107800",
    appId: "1:760195107800:web:631869b5e0d9791f8ac0ad",
    measurementId: "G-KQGEQZT5J9"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export {
    app
};