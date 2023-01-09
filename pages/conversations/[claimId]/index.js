import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from "react";
import BrowserStateUtil from "../../../util/browserStateUtil"
import TwilioUtil from "../../../util/twilioUtil";
import MiddlewareUtil from "../../../util/middlewareUtil";
import {HiChevronLeft,HiOutlineTranslate} from "react-icons/hi";
import InputHelpers from './InputHelpers';
import Loader from '../../../components/Loader';
import {HiOutlineDocumentText,HiChevronUp, HiChevronDown} from "react-icons/hi";
import { signOut as nextSignOut } from "next-auth/react"
import { languageMap } from '../../../config/languageMap';
import moment from 'moment'


export default function Conversation() {
  const router = useRouter()
  const { claimId } = router.query  

 const [conversation,setConversation] = useState(null); 
 
const [showLoading,setShowLoading] = useState(true);  
const [showError,setShowError] = useState(false);  

const [messageList,setMessageList] = useState([]);
const messagesEndRef = useRef(null)

const [newMessage,setNewMessage] = useState("");
const [newMessageTranslated,setNewMessageTranslated] = useState(null);
const [userId,setUserId] = useState(null);

const [areHelpersVisible,setAreHelpersVisible] = useState(false);
const toggleHelpersVisibility=()=>{
  setAreHelpersVisible(old=>!old);
}

useEffect(()=>{
  
  loadMessages();
  return ()=>{
    if(conversation!=null){
      conversation.removeAllListeners();
    }
  }
},[claimId])


useEffect(()=>{
  scrollToBottom();
},[messageList,conversation])

async function closeChatWindow(){
  await MiddlewareUtil.endTask(claimId);
  router.push('/conversations')
}

async function signOut(){
   
  await nextSignOut({callbackUrl: "/api/auth/logout", });
  await BrowserStateUtil.removeUserDetails();
  router.push('/');
}




async function initalizeConversation(token,claimId){

  const max = 5;
  const ms = 1000;
  let clnt,err1,conv,err2;

  for(let iter=0;iter<max;iter++){
    try{
    [clnt,err1] = await TwilioUtil.getConversationClient(token).then(d=>[d,null]).catch(e=>[null,e]);
    }catch(e){
      err1=e;
    }
    console.error({clientError:err1});
    if(err1==null){
      try{
      [conv,err2]  = await clnt.getConversationByUniqueName(claimId).then(d=>[d,null]).catch(e=>[null,e]);
    }catch(e){
      err2=e;
    }

    if(err2==null){

      return conv;
    }
    }
   await new Promise(resolve => setTimeout(resolve, ms));
  }
  setShowError(true);


}

async function  loadMessages(){
  setShowLoading(true);

  if(claimId!=null){

   
    const userDetails  = await BrowserStateUtil.fetchUserDetails();
  console.error({userDetails});
  setUserId(userDetails.identity);

  //1. Start Task

  await MiddlewareUtil.initializeTask(claimId,userDetails.emailId);

  //2. Initialize Conversation
  
  

  const conv = await initalizeConversation(userDetails.token,claimId);

if(conv!=null){


  conv.setAllMessagesRead();
  conv.removeAllListeners();
  conv.on('messageUpdated',m=>{const newMsg = m.message; setMessageList(old=>old.map(o=>(o.sid==newMsg.sid)?newMsg:o)); })
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
  }

  setShowLoading(false);
}


const amITheAuthor = (author) => {
  const encodedIdentity = encodeURIComponent(userId).replace(/\./g, '%2E').replace(/\%/g,"_");
  if(author==userId || author==encodedIdentity){
    return true;
  }

}

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

function handleNewMessageChange(e){
  setNewMessage(e.target.value)
}

function sendMessage(){

  let suffix = "";
  if(areHelpersVisible && newMessageTranslated){
      suffix=`\n\n--\n\n${newMessageTranslated}\n\n--\n\nTranslated by Microsoft Azure`;
  }

  
  conversation.sendMessage(newMessage+suffix,{source: "adjuster"});
  setNewMessage("");
}



if(showError){
  return (   <div className="flex flex-col min-h-full bg-gray-50" style={ {maxHeight: "-webkit-fill-available"}}>
   
   <section className="flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
			<path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
			<rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
			<polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
			<polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
		</svg>
		<p className="text-3xl">Your session has expired</p>
		<a rel="noopener noreferrer" onClick={signOut} className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Go to login page</a>
	</div>
</section>

  </div>)
}


  return (
    
     

    <div className="flex flex-col min-h-full bg-gray-50" style={ {maxHeight: "-webkit-fill-available"}}>



    <nav className="p-4 shadow bg-flex-blue flex justify-between items-center">
            <a onClick={()=>closeChatWindow()}>   <HiChevronLeft color={"#fff"}  size={50} className="" /></a>
            <span className="text-xl leading-normal font-bold text-white">{claimId}</span>
            </nav>


    <div className="">
      {
      showLoading && 
      <Loader />
      }
      </div>

  
 
        <div className="grow w-full overflow-y-auto scroll-smooth">
        <ul className="p-4">
            {messageList.map(m=>(
            <li key={m.sid} className={"flex flex-col my-4 "}>
                
                <div className={"inline-flex relative px-4 py-2 text-gray-700 rounded shadow "+((amITheAuthor(m.author))?" self-end bg-sky-100":" self-start bg-neutral-100 ")}>
                  {m.body} 
                  {
                    (m.attributes?.translations?.en) && 
                     <>
                     <br/>--<br/>
                     {m.attributes?.translations?.en}<br/>
                     --<br/>
                     Translated to {languageMap['en']} by Microsoft Azure
                   </>
                  }   
                </div>    
                    
                <div className={"mt-1 text-xs "+((amITheAuthor(m.author))?"self-end":"self-start")}>{moment(m.dateCreated).format("MM/DD/YYYY, h:mm:ss a")}</div>       
                
                
            </li>
            )
            )
            }
        </ul>
        <div ref={messagesEndRef} />
        </div>
     
       
          <div className="flex w-full"> 

          <button
        className="
          dropdown-toggle
          px-1
          py-1
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
        type="button"
        onClick={toggleHelpersVisibility}


      >
          {
              areHelpersVisible? <HiChevronDown size={30} />: <HiChevronUp  size={30}  />
          }
          
      </button>

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
 
     
      
          {
            areHelpersVisible && 
            <div className="flex w-full  h-1/3">
            <InputHelpers newMessage={newMessage}  setNewMessage={setNewMessage} setNewMessageTranslated={setNewMessageTranslated} />
            </div>
          }

        
         
         
     

      
   

    
 

</div>
      

    
  )
}
