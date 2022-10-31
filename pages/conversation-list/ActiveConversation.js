import { useEffect,useRef } from "react";
import { useState } from "react"
import {HiChevronLeft} from "react-icons/hi";
import localforage from "localforage";
import moment from 'moment'

export default function ActiveConversation({closeChatWindow,conversation}){
    
    const [messageList,setMessageList] = useState([]);
    const messagesEndRef = useRef(null)

    const [newMessage,setNewMessage] = useState("");
    const [userId,setUserId] = useState(null);

   

    useEffect(()=>{

       ( async()=> {
        console.error({conversation,participant: (await conversation.getParticipantByIdentity("WK27f332f51400be0c49a54225bba6499d"))});
       })()
       conversation.setAllMessagesRead();
        loadMessages();
        conversation.on('messageAdded', m => handleMessageAddedEvent(m, conversation));
        conversation.updateLastReadMessageIndex(1);
        (async ()=>{
        setUserId(await localforage.getItem("flex-mobile-conversation-identity"));
        })()
    },[])

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }

      useEffect(() => {
        scrollToBottom();
        conversation.setAllMessagesRead();
      }, [messageList]);


    function handleMessageAddedEvent(message) {
        setMessageList(old=>[...old,message])
        
      };
      async function loadMessages(){
        conversation.getMessages(1000).then(messagePaginator => {  
            
            
            

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

    function handleNewMessageChange(e){
        setNewMessage(e.target.value)
    }

    function sendMessage(){
        conversation.sendMessage(newMessage);
        setNewMessage("");
    }

    return (
        <div className={"container mx-auto flex flex-col h-full v-full"}>
 
        <nav className="p-4 shadow border-b-1 border-slate-500 flex justify-between items-center">
            <a onClick={()=>closeChatWindow()}>   <HiChevronLeft size={50} className="" /></a>
            <span>{conversation?.attributes?.customerNumber}</span>
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