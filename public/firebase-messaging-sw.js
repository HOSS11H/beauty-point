// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCA4cA65cm_yFgy59avVpMpSf9BH9gpALM",
    authDomain: "beauty-notifications.firebaseapp.com",
    projectId: "beauty-notifications",
    storageBucket: "beauty-notifications.appspot.com",
    messagingSenderId: "409127048244",
    appId: "1:409127048244:web:db2491cfc7807b2c4f2661",
    measurementId: "G-KXMXTJSYNC"
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