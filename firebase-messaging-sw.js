importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');


const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCv-uZZqVkJ27w7Ig88aS8Ep2pIPdM9s3s",
  authDomain: "munichre-mobile-poc.firebaseapp.com",
  projectId: "munichre-mobile-poc",
  storageBucket: "munichre-mobile-poc.appspot.com",
  messagingSenderId: "797178128177",
  appId: "1:797178128177:web:1d75db729e9c511f94b210"
};


// Initialize the firebase in the service worker.
firebase.initializeApp(FIREBASE_CONFIG);

const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  

  console.error("Recived payload:",payload)

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,  
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
