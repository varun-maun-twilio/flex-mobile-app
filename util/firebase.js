import localforage from "localforage";
import * as firebase from "firebase/app";
import { getAuth,GoogleAuthProvider,signInWithPopup,signOut } from "firebase/auth";
import { getMessaging,getToken ,onMessage} from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCv-uZZqVkJ27w7Ig88aS8Ep2pIPdM9s3s",
  authDomain: "munichre-mobile-poc.firebaseapp.com",
  projectId: "munichre-mobile-poc",
  storageBucket: "munichre-mobile-poc.appspot.com",
  messagingSenderId: "797178128177",
  appId: "1:797178128177:web:1d75db729e9c511f94b210"
};


export const app = firebase.initializeApp(firebaseConfig);





export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();




export const signInWithGoogle = () => {
  signInWithPopup(auth,googleProvider).then(async (res) => {  
    console.log(res.user.email)

    const endpoint = ' http://localhost:8080/features/mobile-app/getMobileAppConversationToken?emailId='+res.user.email
    await fetch(endpoint).then(d=>d.json()).then(async d=>{
      

      const fcmtokenInLocalForage = await localforage.getItem("flex-mobile-fcm-token");
      if(fcmtokenInLocalForage == null){
        const permission = await  Notification.requestPermission();
        console.error({permission})
        if (permission === 'granted') {
            const messaging = getMessaging(app);
            const currentToken = await  getToken(messaging, { vapidKey: 'BFNbcMkxwd_gSV_cnz_zklEWZsWjSwrEP63gPqjNaVOMwF2fCc3QVYpGrq2XFUrH3p605FAN5cYdUNN2GgOU6bA' });
            if (currentToken) {
                await localforage.setItem("flex-mobile-fcm-token",currentToken);                            
            
              await fetch(' http://localhost:8080/features/mobile-app/updateWorkerToken', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({workerSid: d.data.identity, token: currentToken})
              }).then(d=>d.json());

            } 
         
          }
          
    
      }


    await localforage.setItem("flex-mobile-conversation-token",d.data.token );
    await localforage.setItem("flex-mobile-conversation-identity",d.data.identity );

    window.location.href = '/conversation-list'; 

    }).catch(e=>{
      console.error("lol")
    })

    


  }).catch((error) => {
    console.log(error.message)
  })
}


export const registerPushNotifications= async (ccClient)=>{


}


export const signout = async()=>{
  signOut(auth).then(()=>{
    delete window.conversationClient;
    sessionStorage.setItem("flex-mobile-conversation-token",null);
    sessionStorage.setItem("flex-mobile-conversation-identity",null );
    window.location.href = '/'; 
  }).catch((error) => {
    // An error happened.
  });
}


