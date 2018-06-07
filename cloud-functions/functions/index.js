const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getManual = functions.https.onRequest((req, res) => {
  return admin.firestore().collection('manuals').doc(req.query.id).get().then((doc) => {
    if (doc.exists) {
      return res.send(doc.data().value)
    }
    return false;
  })
})
