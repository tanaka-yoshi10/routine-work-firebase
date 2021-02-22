import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/functions';

import env from './env';

const config = {
    apiKey: env('FIREBASE_API_KEY'),
    authDomain: env('FIREBASE_AUTH_DOMAIN'),
    databaseURL: env('FIREBASE_DATABASE_URL'),
    projectId: env('FIREBASE_PROJECT_ID'),
    storageBucket: env('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID'),
};

firebase.initializeApp(config);

export let functions: firebase.functions.Functions;
if (env('CLOUD_FUNCTIONS_EMULATOR') === 'true') {
    functions = firebase.functions();
    functions.useFunctionsEmulator('http://localhost:5001');
} else {
    functions = firebase.app().functions('asia-northeast1');
}

export let firestore: firebase.firestore.Firestore;
if (env('FIRESTORE_EMULATOR') === 'true') {
    firestore = firebase.firestore();
    firestore.settings({
        host: "localhost:8080",
        ssl: false,
        experimentalForceLongPolling: true
    });
} else {
    firestore = firebase.firestore();
}

export const auth = firebase.auth();
// TODO: エミュレータによる分岐を入れる
export const database = firebase.database();
export const storage = firebase.storage();
export const EmailAuthProvider = firebase.auth.EmailAuthProvider;
export const Timestamp = firebase.firestore.Timestamp;
export const FieldValue = firebase.firestore.FieldValue;
export const provider = new firebase.auth.GoogleAuthProvider();
