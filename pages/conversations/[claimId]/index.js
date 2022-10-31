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
    
     

    <div className="flex flex-col min-h-screen ">





    {
      showLoading && 
      <div  className="p-16 flex text-center mx-auto items-center justify-center">
    <svg className="mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    </div>
    }




    <nav className="p-4 shadow border-b-1 border-slate-500 flex justify-between items-center">
            <a onClick={()=>closeChatWindow()}>   <HiChevronLeft size={50} className="" /></a>
            <span>{claimId}</span>
            </nav>

  
 
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
