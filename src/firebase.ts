// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/database';
// import 'firebase/storage';
// import 'firebase/auth';
// import 'firebase/functions';
import { initializeApp } from "firebase/app"
import { getFirestore, Firestore } from "firebase/firestore";

import env from './env';
import { Functions, getFunctions } from 'firebase/functions';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const config = {
    apiKey: env('FIREBASE_API_KEY'),
    authDomain: env('FIREBASE_AUTH_DOMAIN'),
    databaseURL: env('FIREBASE_DATABASE_URL'),
    projectId: env('FIREBASE_PROJECT_ID'),
    storageBucket: env('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID'),
};

const firebaseApp = initializeApp(config);

export let functions: Functions;
if (env('CLOUD_FUNCTIONS_EMULATOR') === 'true') {
    functions = getFunctions(firebaseApp);
    // FIXME:
    // functions.useFunctionsEmulator('http://localhost:5001');
} else {
    functions = getFunctions(firebaseApp, 'asia-northeast1');
}

export let firestore: Firestore;
if (env('FIRESTORE_EMULATOR') === 'true') {
    // FIXME:
    firestore = getFirestore(firebaseApp);
    // firestore.settings({
    //     host: "localhost:8080",
    //     ssl: false,
    //     experimentalForceLongPolling: true
    // });
} else {
    firestore = getFirestore(firebaseApp);
}

export const auth = getAuth(firebaseApp);
// TODO: エミュレータによる分岐を入れる
export const database = firestore;
// export const storage = firebase.storage();
// export const EmailAuthProvider = firebase.auth.EmailAuthProvider;
// export const FieldValue = firebase.firestore.FieldValue;
export const provider = new GoogleAuthProvider();
// export type User = firebase.User;
