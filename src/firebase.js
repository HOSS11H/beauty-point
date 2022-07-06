// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCA4cA65cm_yFgy59avVpMpSf9BH9gpALM",
    authDomain: "beauty-notifications.firebaseapp.com",
    projectId: "beauty-notifications",
    storageBucket: "beauty-notifications.appspot.com",
    messagingSenderId: "409127048244",
    appId: "1:409127048244:web:db2491cfc7807b2c4f2661",
    measurementId: "G-KXMXTJSYNC"

};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const getNotificationToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BK1293IpBkw_Xvsx-cD6DmK7TsOIIaevZbQrfmAmzLw5sTHnSe3Bq9W9exYiefQCoEOxmRaDkxeVrmDGIU6LSnc' })
        .then((currentToken) => {
            if (currentToken) {
                //console.log('current token for client: ', currentToken);
                // Perform any other neccessary action with the token
                localStorage.setItem('fcm_token', currentToken)
            } else {
                // Show permission request UI
                console.log('No registration token available. Request permission to generate one.');
            }
        })
        .catch((err) => {
            //console.log('An error occurred while retrieving token. ', err);
        });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            //console.log("payload", payload)
            resolve(payload);
        });
    });
