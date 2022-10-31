import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr'
import BrowserStateUtil from "../../util/browserStateUtil"
import MiddlewareUtil from "../../util/middlewareUtil";
import BottomMenu from '../../components/BottomMenu';

export default function ConversationList() {
    const router = useRouter()
const [showLoading,setShowLoading] = useState(false);  



const { data: claimList, error } = useSWR('loadClaims', loadClaims, {refreshInterval:5000})





async function  loadClaims(){
    setShowLoading(true);
  const {workerSid}  = await BrowserStateUtil.fetchUserDetails();
  const {conversationList=[]} = await MiddlewareUtil.fetchClaims({workerSid});
  setShowLoading(false);
  return conversationList;
}


  return (
    
     

    <div className="flex flex-col min-h-screen " style={ {maxHeight: "-webkit-fill-available"}}>


      <div class="animate-pulse duration-300 flex space-x-4 h-4 justify-end">
      {
      showLoading && 
      <span class="animate-pulse inline-flex h-4 w-4 rounded-full  bg-rose-600 opacity-100"></span>
      }
      </div>
    



   


<header className="grow flex text-center mx-auto items-center justify-center">
            <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
               Conversation List            
            </h2>
    </header>


  
    

    {claimList!=null && claimList.length>0 &&
<div className="h-3/5 overflow-y-auto scroll-smooth">
    <ul role="list" className="h-3/5 ">
             {
      claimList.map(c=><li key={"convsid-"+c.key} >
        <a className="block py-4 px-4 border-y-[1px] border-slate-300"  onClick={(e)=>{ router.push(`/conversations/${c.key}`)}}>
                <div className="flex items-center space-x-4">                    
                    <div className="flex-1 flex justify-between min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {c.key} 
                        </p> 

                        <p>
                            {c.customerPhoneNumber}
                        </p>
                    
                        
                                                 
                    </div>                    
                </div>
                </a>
            </li>)
    }
          </ul>
</div>
    }
 

 <BottomMenu activeScreen="/conversations" />

</div>
      

    
  )
}
