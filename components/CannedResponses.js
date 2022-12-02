import { useEffect, useState } from "react";
import {HiChevronUp, HiChevronDown} from "react-icons/hi";
import MiddlewareUtil from "../util/middlewareUtil";
export default function CannedResponses({updateText}){


    const [isModalOpen,setIsModalOpen] = useState(false);
    const [cannedMessageGroups,setCannedMessageGroups] = useState([]);


    useEffect(()=>{
        loadCannedResponses();

    },[]);


    



    const loadCannedResponses= async ()=>{
        try{

     
            const cannedResponses = await MiddlewareUtil.getCannedResponses();

            setCannedMessageGroups(cannedResponses);
        }catch(e){
            console.error(e);
        }
    }

    const toggleModal=()=>{
        setIsModalOpen(old=>!old);
    }



    return (
        <div className="flex justify-center">
  <div>
    <div className="dropup relative">
      
      
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
        onClick={toggleModal}


      >
          {
              isModalOpen? <HiChevronDown size={50} />: <HiChevronUp size={50}  />
          }
          
      </button>
    </div>
  </div>

{isModalOpen && 

<div id="staticModal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true" 
className="fixed top-0 left-0 right-0 z-50  w-full bg-white p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"

style={{bottom:60}}
>
    <div className="relative w-full h-full ">
        
        
            
            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Canned Responses:
                </h3>
               
            </div>
           
           {cannedMessageGroups &&
           cannedMessageGroups.map(g=>(
               <div className="p-4 border rounded my-2" key={`canned-grp-${g.section}`}>
               <h5 className="text-l font-semibold text-gray-900 dark:text-white">
                   {g.section}
               </h5>
               <ul>
               {
                   (g.questions || []).map((q,qIter)=>(
                       <li
                       key={`canned-grp-${g.section}-${qIter}`}
                       ><a onClick={()=>{
                        updateText(q.text);
                        setIsModalOpen(false);
                       }}  className="block p-2 my-3 text-gray-500 dark:text-gray-400 underline">{q.text}</a></li>
                   ))
               }
               </ul>
               </div>
           ))

           }
           
           
       
    </div>
</div>
}

</div>
    )
}