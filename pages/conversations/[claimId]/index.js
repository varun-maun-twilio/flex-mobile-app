import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import BrowserStateUtil from "../../../util/browserStateUtil"
import TwilioUtil from "../../../util/twilioUtil";
import MiddlewareUtil from "../../../util/middlewareUtil";
import {HiChevronLeft} from "react-icons/hi";
import moment from 'moment'


export default function Conversation() {
  const router = useRouter()
  const { claimId } = router.query  

 const [conversation,setConversation] = useState(null); 
 
const [showLoading,setShowLoading] = useState(true);  

const [messageList,setMessageList] = useState([]);
const messagesEndRef = useRef(null)

const [newMessage,setNewMessage] = useState("");
const [userId,setUserId] = useState(null);

useEffect(()=>{
  scrollToBottom();
  loadMessages();
  return ()=>{
    if(conversation!=null){
      conversation.removeAllListeners();
    }
  }
},[])


useEffect(()=>{
  //Do nothing
},[messageList,conversation])

function closeChatWindow(){
  router.push('/conversations')
}



async function  loadMessages(){
  setShowLoading(true);

  if(claimId!=null){

    console.error('claimId',claimId);
    const userDetails  = await BrowserStateUtil.fetchUserDetails();
  console.error({userDetails});
  setUserId(userDetails.identity);

  //1. Start Task

  await MiddlewareUtil.initializeTask(claimId,userDetails.emailId);

  //2. Initialize Conversation
 
  const conversationClient = await TwilioUtil.getConversationClient(userDetails.token);
  const conv = await conversationClient.getConversationByUniqueName(claimId);
  conv.setAllMessagesRead();
  conv.removeAllListeners();
  conv.on('messageAdded', m => { console.error('Executing adding messages',m); setMessageList(old=>[...old,m])});
  setConversation(conv);
  //3. Load messages 
  conv.getMessages(1000).then(messagePaginator => {  
    setMessageList(messagePaginator.items.map(s=>{return {
author:s.author,
sid:s.sid,
body:s.body,
dateCreated:s.dateCreated,
attributes:s.attributes,
type:s.type
    }}));
  
})
}

  setShowLoading(false);
}


const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

function handleNewMessageChange(e){
  setNewMessage(e.target.value)
}

function sendMessage(){
  conversation.sendMessage(newMessage);
  setNewMessage("");
}

  return (
    
     

    <div className="flex flex-col min-h-screen " style={ {maxHeight: "-webkit-fill-available"}}>



    <nav className="p-4 shadow border-b-1 border-slate-500 flex justify-between items-center">
            <a onClick={()=>closeChatWindow()}>   <HiChevronLeft size={50} className="" /></a>
            <span>{claimId}</span>
            </nav>


      <div class="animate-pulse duration-300 flex space-x-4 h-4 justify-end">
      {
      showLoading && 
      <span class="animate-pulse inline-flex h-4 w-4 rounded-full  bg-rose-600 opacity-100"></span>
      }
      </div>

  
 
        <div className="grow w-full overflow-y-auto scroll-smooth">
        <ul className="p-4">
            {messageList.map(m=>(
            <li key={m.sid} className={"flex flex-col my-4 "}>
                
                <div className={"inline-flex relative px-4 py-2 text-gray-700 rounded shadow "+((userId==m.author)?" self-end bg-sky-100":" self-start bg-neutral-100 ")}>{m.body}</div>           
                <div className={"mt-1 text-xs "+((userId==m.author)?"self-end":"self-start")}>{moment(m.dateCreated).format("MM/DD/YYYY, h:mm:ss a")}</div>       
                
                
            </li>
            )
            )
            }
        </ul>
        <div ref={messagesEndRef} />
        </div>
     
        <div className="flex w-full">
        <input
      type="text"
      value={newMessage}
      onChange={handleNewMessageChange}
      className="
      grow
        form-control
        block
        
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
      
      placeholder="Enter Message"
    />

<button className="block align-middle mx-auto shadow bg-blue-600 text-white text-l py-3 px-10 font-bold" onClick={sendMessage}>Send</button>
    
        </div>
 
     
 
     


    

    
 

</div>
      

    
  )
}
