import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";

const firebaseCredentials = ".firebase-credentials.json";

function initializeFirebase() {
    initializeApp({ credential: admin.credential.cert(firebaseCredentials) });
}

export default initializeFirebase;
