const endpoint = process.env.NEXT_PUBLIC_TWILIO_SERVERLESS;

module.exports = {

    fetchClaims: async (workerSid) =>{

        return fetch(`${endpoint}/features/conversation/fetchConversationList`,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({ workerSid })
             }).then(d=>d.json()).then(d=>d.data);
 
 
     }, 
     initializeTask: async (claimId,agentEmailId) => {
        

        return fetch(`${endpoint}/features/conversation/initiateOutbound`,
             {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({claimId,agentEmailId  })
             }).then(d=>d.json()).then(d=>d.data);
     },
     endTask: async (claimId) => {
        return fetch(`${endpoint}/features/conversation/parkInteraction`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({claimId  })
        }).then(d=>d.json()).then(d=>d.data);
     }

}