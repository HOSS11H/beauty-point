// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDjpCr5-dIX-vU4BqE2vkk_MWlMgPuLQ0U",
    authDomain: "beauty-point-d2edc.firebaseapp.com",
    projectId: "beauty-point-d2edc",
    storageBucket: "beauty-point-d2edc.appspot.com",
    messagingSenderId: "994870938989",
    appId: "1:994870938989:web:0b05605f07bf4981661e64",
    measurementId: "G-PLDYRB39MM"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});