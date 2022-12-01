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


self.addEventListener('notificationclick', function(event) {
  let url = event.notification.data.url;
  //event.notification.close(); // Android needs explicit close.
  event.waitUntil(
      clients.matchAll({type: 'window', includeUncontrolled: true,}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
  );
});

messaging.onBackgroundMessage(function(payload) {
  

  console.error("Recived payload:",payload)

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    data:{
      url:payload.data.url
    }  
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});

