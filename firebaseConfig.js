const firebase = require('firebase');
const fsAdmin = require("firebase-admin");
const serviceAccount = require("./eternal-luck-firebase.json");


fsAdmin.initializeApp({
    credential: fsAdmin.credential.cert(serviceAccount)
});


