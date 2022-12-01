import BrowserStateUtil from "./browserStateUtil"
const endpoint = process.env.NEXT_PUBLIC_TWILIO_SERVERLESS;
const taskEndpoint = process.env.NEXT_PUBLIC_TWILIO_SERVERLESS_TASKS;

module.exports = {

    fetchClaims: async (searchText) =>{

        return fetch(`${endpoint}/conversation/search `,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization':`Bearer ${await BrowserStateUtil.getAzureAccessToken()}`
                 },
                 body: JSON.stringify({  })
             }).then(d=>d.json()).then(d=>d.data);
 
 
     }, 
     initializeTask: async (claimId,agentEmailId) => {
        

        return fetch(`${taskEndpoint}/features/conversation/initiateOutbound`,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({claimId,agentEmailId  })
             }).then(d=>d.json()).then(d=>d.data);
     },
     endTask: async (claimId) => {
        return fetch(`${taskEndpoint}/features/conversation/parkInteraction`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({claimId  })
        }).then(d=>d.json()).then(d=>d.data);
     }

}