import * as functions from "firebase-functions";

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
export const uploadFile = functions.https.onRequest((request, response) => {
  response.status(200).json({
    message:'It works!'
  })
});

