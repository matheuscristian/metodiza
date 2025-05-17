import admin from "firebase-admin";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

function requireDefinedValue<t>(T: t) {
    if (T === undefined) {
        throw new Error("Firebase config is not set");
    }

    return T;
}

const firebaseConfig = {
    type: requireDefinedValue(process.env.FB_TYPE),
    project_id: requireDefinedValue(process.env.FB_PROJECT_ID),
    private_key_id: requireDefinedValue(process.env.FB_PRIVATE_KEY_ID),
    private_key: requireDefinedValue(process.env.FB_PRIVATE_KEY).replace(/\\n/g, "\n"),
    client_email: requireDefinedValue(process.env.FB_CLIENT_EMAIL),
    client_id: requireDefinedValue(process.env.FB_CLIENT_ID),
    auth_uri: requireDefinedValue(process.env.FB_AUTH_URI),
    token_uri: requireDefinedValue(process.env.FB_TOKEN_URI),
    auth_provider_x509_cert_url: requireDefinedValue(process.env.FB_AUTH_PROVIDER_X509_CERT_URL),
    client_x509_cert_url: requireDefinedValue(process.env.FB_CLIENT_X509_CERT_URL),
    universe_domain: requireDefinedValue(process.env.FB_UNIVERSE_DOMAIN),
};

if (admin.apps.length === 0) {
    initializeApp({ credential: admin.credential.cert(firebaseConfig as ServiceAccount) });
    console.log("Firebase initialized");
}

export default admin;
