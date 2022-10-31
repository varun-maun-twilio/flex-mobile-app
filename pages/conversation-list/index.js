import Head from 'next/head'
import localforage from "localforage";
import { useEffect, useState } from 'react';
import { Client as ConversationsClient } from "@twilio/conversations";
import { registerPushNotifications } from '../../util/firebase';
import BottomMenu from '../../components/BottomMenu';
import ActiveConversation from './ActiveConversation';


export default function Home() {
  const [fcmToken, setFcmToken] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [conversationClient,setConversationClient] = useState(null);
  const [connectionStatus,setConnectionStatus] = useState("Loading");
  const [conversations,setConversations] = useState([]);
  const [selectedConversationSid,setSelectedConversationSid] = useState(null);
  const [selectedConversation,setSelectedConversation] = useState(null);
  const [userId,setUserId] = useState(null);

  const [sortedConversations,setSortedConversations] = useState([])


//On Load
useEffect(()=>{

  (async ()=>{
    setUserId(await localforage.getItem("flex-mobile-conversation-identity"));
    })()
 
  initializeConversations();

  ()=>{
    if(ccClient)
    ccClient.shutdown()
  }
},[])

useEffect(()=>{
  setSortedConversationList();
},[conversations])

useEffect(()=>{
  //do nothing
},[sortedConversations])



function selectConversation(sid){
  setSelectedConversationSid(sid);
  setSelectedConversation(conversations.find(c=>c.sid==sid))
}






async function initializeConversations(){
  

  if(isLoading==false && window.conversationClient==null){

  setLoading(true);

  const workerSid  = await localforage.getItem("flex-mobile-conversation-identity");

  const apiResponseToken =  await localforage.getItem("flex-mobile-conversation-token")
  
  let ccClient = new ConversationsClient(apiResponseToken);
  setConnectionStatus("Connecting to Twilio…");

  ccClient.on("connectionStateChanged", (state) => {
    if (state === "connecting"){
      setConnectionStatus("Connecting to Twilio…");
    }
    if (state === "connected") {
      setConnectionStatus("You are connected");       
    }
    if (state === "disconnecting"){
      setConnectionStatus("Disconnecting from Twilio…");  
    }       
    if (state === "disconnected"){
      setConnectionStatus("disconnected");  
    }
    if (state === "denied"){
      setConnectionStatus("Failed to connect");  
    }       
  });
  ccClient.on("conversationJoined", (conversation) => {
    setConversations(old=>[...old,conversation])
  });
  ccClient.on("conversationLeft", (thisConversation) => {
    setConversations(old=>[...old.filter((it) => it !== thisConversation)])     
  });

  //setFcmToken(await registerPushNotifications(ccClient));

  window.conversationClient = ccClient;
  setLoading(false)
  }
}

async function setSortedConversationList(){
  let convList = [];
  

  if(conversations!=null && conversations.length>0){
    let convMap = {}

    for(let c of conversations){
      if(convMap[c.sid]==null){

        
        console.log({
         conversationLastMessageTimestamp: c?.lastMessage?.dateCreated,
        
        })

        const unreadMessageCount = await c.getUnreadMessagesCount();

        convList.push({conversation:c,unreadMessageCount});
        convMap[c.sid]=1;
      }
    }


  }

  convList.sort(function(a, b){return (b.conversation.lastMessage?.dateCreated || new Date()) - (a.conversation.lastMessage?.dateCreated || new Date())});

  setSortedConversations(convList);

}





if (isLoading) return <p>Loading...</p>


if(selectedConversationSid!=null){
  return (<ActiveConversation key={"conv-"+selectedConversationSid} conversation={selectedConversation} closeChatWindow={()=>{
    setSelectedConversation(null);
    setSelectedConversationSid(null);
  }} />)
}





  return (
    


     

    <div className={"container mx-auto flex flex-col h-full v-full"}>
       <Head>
        <title>Conversation List</title>
        
      </Head>

    <header className="grow flex text-center mx-auto items-center justify-center">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
               Conversation List            
            </h2>
    </header>


    { connectionStatus!="You are connected" &&
      <div role="status" className="h-1/2 m-auto">
      <svg aria-hidden="true" className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span className="sr-only">Loading...</span>
  </div>
    }


    

    {conversations!=null && conversations.length>0 &&
<div className="h-3/5 overflow-y-auto scroll-smooth">
    <ul role="list" className="h-3/5 ">
             {
      sortedConversations.map(c=><li key={"convsid-"+c.conversation.sid} >
        <a className="block py-4 px-4 border-t-[1px] border-slate-300"  onClick={(e)=>selectConversation(c.conversation.sid)}>
                <div className="flex items-center space-x-4">                    
                    <div className="flex-1 flex justify-between min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {c.conversation.attributes.customerNumber} 
                        </p> 
                        <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {c.unreadMessageCount}

                        </span>
                        
                                                 
                    </div>                    
                </div>
                </a>
            </li>)
    }
          </ul>
</div>
    }
    


    <BottomMenu activeScreen="/conversation-list" />

    </div>


      

    
  )
}
