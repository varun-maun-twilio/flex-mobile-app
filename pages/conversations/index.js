import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr'
import Image from 'next/image'
import BrowserStateUtil from "../../util/browserStateUtil"
import MiddlewareUtil from "../../util/middlewareUtil";
import BottomMenu from '../../components/BottomMenu';
import Loader from '../../components/Loader';
import iconImage from '../../public/static/images/flex-white-icon.png'

export default function ConversationList() {
    const router = useRouter()
const [showLoading,setShowLoading] = useState(false);  



const { data: claimList, error } = useSWR('loadClaims', loadClaims, {refreshInterval:5000})


async function openSearchScreen(){
  router.push('/conversations/search');
}


async function  loadClaims(){
    setShowLoading(true);
  const {claimsConversations=[]} = await MiddlewareUtil.fetchClaims();
  setShowLoading(false);
  return claimsConversations;
}


  return (
    
     

    <div className="flex flex-col min-h-full  bg-gray-50" style={ {maxHeight: "-webkit-fill-available"}}>

<nav className="p-4 shadow bg-flex-blue  flex justify-start  items-center">
<Image
        src={iconImage}
        alt="Flex mobile Icon"
        height="30"
        width="30"
      />
            <span className="text-xl ml-6 leading-normal font-bold text-white">Flex Mobile</span>
            </nav>


            <div className="">
      {
      showLoading && 
      <Loader />
      }
      </div>

      <div className="m-3 ">
           
           <h2 className="text-sm mb-1  font-bold text-gray-600">
                      Recent Conversations:
                   </h2>
       </div>  

    
    

  
<div className="grow overflow-y-auto scroll-smooth">
{claimList!=null && claimList.length>0 &&
    <ul role="list" className="h-full mx-3">
             {
      claimList.map(c=><li key={"convsid-"+c.claimId} >
        <div className="block p-4 bg-white rounded-3xl shadow-md shadow-gray-200"  
        >
                <div className="flex items-center space-x-4">                    
                    <div className="flex-1 flex justify-between min-w-0 items-center">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {c.claimId} 
                        </p> 

                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {c.customerPhoneNumber}
                        </p>

                        <a className="block p-1 bg-gray-100 rounded-full " onClick={(e)=>{ router.push(`/conversations/${c.claimId}`)}}>
                        <svg className="w-8 h-8 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" aria-labelledby="ChevronRightIcon-1267"><path fill="currentColor" fillRule="evenodd" d="M9.707 6.293a1 1 0 00-1.497 1.32l.083.094L10.585 10l-2.292 2.293a1 1 0 00-.083 1.32l.083.094a1 1 0 001.32.083l.094-.083 3-3a1 1 0 00.083-1.32l-.083-.094-3-3z"></path></svg>
                        </a>
                    
                        
                                                 
                    </div>                    
                </div>
                </div>
            </li>)
    }
          </ul>
    }
    <a className="flex items-center justify-center absolute h-16 w-16 bg-amber-300 right-6 mb-24 bottom-0 rounded-full  shadow-lg shadow-gray-400"
      onClick={()=>openSearchScreen()}
    >
    <svg className="h-12 w-12" role="img" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-labelledby="SearchIcon-1558"><path fill="currentColor" fillRule="evenodd" d="M5.43 5.43a4.882 4.882 0 017.383 6.347l2.973 2.973a.732.732 0 01-1.036 1.036l-2.973-2.973A4.883 4.883 0 015.43 5.43zm1.035 1.035a3.417 3.417 0 104.833 4.833 3.417 3.417 0 00-4.833-4.833z"></path></svg>
      </a>


</div>
    
 

 <BottomMenu activeScreen="/conversations" />

</div>
      

    
  )
}
