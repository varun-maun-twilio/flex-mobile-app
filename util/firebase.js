import * as firebase from "firebase/app";
import "firebase/messaging";

import localforage from "localforage";
import { getMessaging,getToken } from "firebase/messaging";

const firebaseCloudMessaging = {
  init: async () => {
    if (!firebase?.apps?.length) {

      // Initialize the Firebase app with the credentials
      const firebaseApp = await firebase.initializeApp({
        apiKey: "AIzaSyCv-uZZqVkJ27w7Ig88aS8Ep2pIPdM9s3s",
        authDomain: "munichre-mobile-poc.firebaseapp.com",
        projectId: "munichre-mobile-poc",
        storageBucket: "munichre-mobile-poc.appspot.com",
        messagingSenderId: "797178128177",
        appId: "1:797178128177:web:1d75db729e9c511f94b210"
      });

      try {
        

        const messaging = getMessaging(firebaseApp);
        const tokenInLocalForage = await localforage.getItem("fcm_token");

         // Return the token if it is alredy in our local storage
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // Request the push notification permission from browser
        const status = await Notification.requestPermission();
        if (status && status === "granted") {
        
        // Get new token from Firebase
        const swRegistration = await navigator.serviceWorker.register('/flex-mobile-app/firebase-messaging-sw.js');

          const fcm_token = await getToken( messaging,{
            vapidKey: "BFNbcMkxwd_gSV_cnz_zklEWZsWjSwrEP63gPqjNaVOMwF2fCc3QVYpGrq2XFUrH3p605FAN5cYdUNN2GgOU6bA",
            serviceWorkerRegistration:swRegistration
          });

     

          // Set token in our local storage
          if (fcm_token) {
            localforage.setItem("fcm_token", fcm_token);
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
};
export { firebaseCloudMessaging };