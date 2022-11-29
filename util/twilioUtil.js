
const { Client: ConversationsClient } = require("@twilio/conversations");
import BrowserStateUtil from "./browserStateUtil"
const endpoint = process.env.NEXT_PUBLIC_TWILIO_SERVERLESS;




module.exports = {



     fetchWorkerDetails :  async () =>{

       return await fetch(`${endpoint}/conversation/getTwilioToken`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${await BrowserStateUtil.getAzureAccessToken()}`
                },
                body: JSON.stringify({  })
            }).then(d=>d.json()).then(d=>d.data);


    },


    updateWorkerToken :  async (fcmToken) =>{

        return await fetch(`${endpoint}/notfications/updateToken`,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization':`Bearer ${await BrowserStateUtil.getAzureAccessToken()}`
                 },
                 body: JSON.stringify({fcmToken  })
             }).then(d=>d.json()).then(d=>d.data);
 
 
     },

    getConversationClient: async (workerToken) => {
       

        return new Promise(function (fulfilled, rejected) {

            let ccClient = new ConversationsClient(workerToken);

            ccClient.on("connectionStateChanged", (state) => {
                if (state === "connecting"){
                 //Do Nothing
                }
                if (state === "connected") {
                    fulfilled(ccClient )      
                }     
                if (state === "disconnected"){
                    return rejected( new Error("Disconnected") );  
                }
                if (state === "denied"){
                    return rejected( new Error("Failed to connect") );  
                }       
              });
         })

    }

}


