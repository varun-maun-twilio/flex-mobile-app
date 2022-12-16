import { useEffect, useState } from "react";
import MiddlewareUtil from "../util/middlewareUtil";
export default function CannedResponses({updateText}){


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

  



    return (
       


    <div className="relative w-full  ">
         
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
                       
                       }}  className="block p-2 my-3 text-gray-500 dark:text-gray-400 underline">{q.text}</a></li>
                   ))
               }
               </ul>
               </div>
           ))

           }
           
           
       
    </div>

    )
}