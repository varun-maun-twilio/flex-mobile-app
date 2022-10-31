const { Client: ConversationsClient } = require("@twilio/conversations");

const endpoint = process.env.NEXT_PUBLIC_TWILIO_SERVERLESS;

module.exports = {



     fetchWorkerDetails :  async (emailId) =>{

       return await fetch(`${endpoint}/features/mobile-app/getMobileAppConversationToken`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ emailId })
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


