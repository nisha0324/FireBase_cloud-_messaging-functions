const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {

    const original = req.query.text;
    
    const writeResult = await admin.firestore().collection('messages').add({original: original});
 
    res.json({result: `Message with ID: ${writeResult.id} added.`});

});
    exports.pushNotification = functions.firestore.document('/hello/{id}').onCreate((change, context) => {
        console.log('Push notification event triggered');
    
          const value = change.data.original;

        // Create a notification
        const payload = {
            notification: {
                title: "hello",
                body: "Nisha Project",
            }
        };
        return admin.messaging().sendToTopic("users", payload);
    });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");

