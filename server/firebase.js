var admin = require('firebase-admin')
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = db;//only exports db. use exports.[varname] to export multiple thigns
//or we can do module.exports = {somejsonstuff}, which can be destructured later