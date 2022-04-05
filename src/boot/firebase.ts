//==============================================================
//
//  #####  ##  #####    #####  #####     ###     ####  #####
//  ##     ##  ##  ##   ##     ##  ##   ## ##   ##     ##
//  #####  ##  #####    #####  #####   ##   ##   ###   #####
//  ##     ##  ##  ##   ##     ##  ##  #######     ##  ##
//  ##     ##  ##   ##  #####  #####   ##   ##  ####   #####
//
//==============================================================

import admin from "firebase-admin";

export const firebaseApp: admin.app.App = admin.initializeApp({
  credential: admin.credential.cert(require("../../firebase_certificate.json")),
});

export default firebaseApp;
