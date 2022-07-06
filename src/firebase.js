// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjpCr5-dIX-vU4BqE2vkk_MWlMgPuLQ0U",
    authDomain: "beauty-point-d2edc.firebaseapp.com",
    projectId: "beauty-point-d2edc",
    storageBucket: "beauty-point-d2edc.appspot.com",
    messagingSenderId: "994870938989",
    appId: "1:994870938989:web:0b05605f07bf4981661e64",
    measurementId: "G-PLDYRB39MM"

};

// Initialize Firebase
initializeApp(firebaseConfig);
const messaging = getMessaging();

export const getNotificationToken = (setTokenFound) => {
    return getToken(messaging, { vapidKey: 'BErUUCNfX5otVZgUTD1Fi5fs9CqPgu9rZpZl3VNJu3hyi-HpkEglYiIE38cqx3wzpfx5wn6R3EwvTbAqicmuUlI' })
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
