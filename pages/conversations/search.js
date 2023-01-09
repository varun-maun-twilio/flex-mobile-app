import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import useSWR from 'swr'
import BrowserStateUtil from "../../util/browserStateUtil"
import MiddlewareUtil from "../../util/middlewareUtil";
import Loader from '../../components/Loader';
import {HiChevronLeft,HiOutlineTranslate} from "react-icons/hi";
export default function ConversationList() {
    const router = useRouter()
const [showLoading,setShowLoading] = useState(false);  

const [searchText, setSearchText] = useState("");

const [claimList, setClaimList ] = useState(null);


async function goToConversations(){
    router.push('/conversations');
}


async function  loadClaims(){
    setShowLoading(true);
    let newClaimList = [];
    try{
  const {claims=[]} = await MiddlewareUtil.searchClaims(searchText);
  newClaimList.push(...claims);
    }catch(e){
        console.error(e);
    }
    setClaimList(newClaimList);
  setShowLoading(false);
}

async function  initiateOutbound(claimObj){
    setShowLoading(true);
   const userDetails = await BrowserStateUtil.fetchUserDetails()
   console.error({claimObj,userDetails});

   const {phoneNumber:customerPhone,claimId} = claimObj;
   const {emailId:agentEmailId} =userDetails;
    const claimResponse =   await MiddlewareUtil.initializeTask(claimId,agentEmailId,customerPhone)
    console.error({claimResponse});
    router.push(`/conversations/${claimId}`)

  setShowLoading(false);
}


  return (
    
     

    <div className="flex flex-col min-h-full bg-gray-50" style={ {maxHeight: "-webkit-fill-available"}}>

<nav className="p-4 shadow bg-flex-blue  flex justify-start  items-center">
            <a onClick={()=>{goToConversations()}}>   <HiChevronLeft color={"#fff"} size={50} className="mr-6" /></a>
            <span className="text-xl leading-normal font-bold text-white">Search</span>
            </nav>


    <div className="m-3 ">
           
   

     <div className="p-4 bg-white rounded-lg shadow-md shadow-gray-200">
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" 
                  className="w-5 h-5 text-gray-500 dark:text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" 
                id="default-search" 
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                placeholder="Enter Claim Number" 
                required
                value={searchText}
                onChange={e=>setSearchText(e.target.value)}
                />
        
        <button  className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={()=>{loadClaims()}}
        >Search</button>
    </div>
    </div>

    </div>


      <div className="">
      {
      showLoading && 
      <Loader />
      }
      </div>
    



   


      <div className="m-3 ">
           
           <h2 className="text-sm mb-1  font-bold text-gray-600">
                      Search Results:
                   </h2>
       </div>            


  
    

   
<div className="grow overflow-y-auto scroll-smooth px-3">
{claimList!=null && claimList.length>0 &&
    <ul role="list" className="h-full ">
             {
      claimList.map(c=><li key={"convsid-"+c.claimId} 
                           className="block p-4 bg-white rounded-3xl shadow-md shadow-gray-200" >
       
               <table className="w-full">
               <tbody>
                   <tr>
                       <th className="text-sm font-normal text-gray-500 pr-6 py-1">
                            Name:
                       </th>
                       <td className="text-sm  py-1">
                            {c.firstName} {c.lastName}
                        </td>
                   </tr>
                   <tr>
                   <th className="text-sm font-normal text-gray-500 pr-6  py-1">
                            Phone: 
                       </th>
                       <td className="text-sm  py-1">
                            {c.phoneNumber}
                        </td>
                   </tr>
                   <tr>
                   <th className="text-sm font-normal text-gray-500 pr-6  py-1">
                            Email:
                       </th>
                       <td className="text-sm  py-1 ">
                        { c.email }
                        </td>
                   </tr>
                  
                   <tr>
                      
                       <td colSpan="2" className="pt-3 ">
                           <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-between items-center m-auto mr-0 "
                           onClick={()=>{initiateOutbound(c)}}
                           >
                               <span >
                           <svg role="img" aria-hidden="true"  viewBox="0 0 20 20" fill="none" 
                           className="w-5 h-5 "
                           aria-labelledby="ChatIcon-857"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M3.302 2.755A3.458 3.458 0 015.466 2h2.268a3.468 3.468 0 013.322 2.476.5.5 0 00.959-.286A4.468 4.468 0 007.734 1H5.468a4.458 4.458 0 00-2.2 8.34v3.493a.5.5 0 00.853.353l2.267-2.266a.5.5 0 00-.708-.707l-1.413 1.413V9.037a.5.5 0 00-.286-.452 3.458 3.458 0 01-.68-5.83zm8.965 3.911a4.466 4.466 0 100 8.933h.36l3.253 3.254a.5.5 0 00.853-.354v-3.492A4.459 4.459 0 0019 11.134a4.469 4.469 0 00-4.466-4.468h-2.267zM9.816 8.682a3.466 3.466 0 012.451-1.016h2.267A3.467 3.467 0 0118 11.132a3.459 3.459 0 01-1.98 3.12.5.5 0 00-.287.451v2.589l-2.546-2.546a.5.5 0 00-.353-.147h-.567a3.466 3.466 0 01-2.451-5.917z"></path></svg>
                           </span>
                             <span className="text-sm ml-2">  Chat </span>
                           </button>
                        </td>
                   </tr>
                   </tbody>
               </table>
               
            </li>)
    }
          </ul>
}

{
  claimList==null &&
<p className="text-lg  text-gray-600 text-center mt-6">No Claims Found
        </p>
}
    
    {
        (claimList!=null && claimList.length==0) &&
        <div>
        <p className="text-md  text-gray-600 text-center mt-6 mb-6">No Claims Found
        </p>
        

        <div  className="block p-4 bg-white rounded-3xl shadow-md shadow-gray-200" >
        <h2 className="text-sm mb-1  font-bold text-gray-800 text-center">
                      Start New Chat
                   </h2>
       
               <table className="w-full">
               <tbody>
                   <tr>
                   <td className="text-sm  py-1 ">
                       <div className="text-sm font-normal text-gray-500 pr-6 py-1 ">
                            Claim Number:
                       </div>

                       
                            <input placeholder="Enter claim number" 
                                    className="w-full p-2 border-[1px] border-black-800 rounded-lg " />
                        </td>
                   </tr>
                   <tr>
                       
                       <td className="text-sm  py-1">
                       <div className="text-sm font-normal text-gray-500 pr-6 py-1">
                            Customer Name:
                       </div>
                            <input placeholder="Enter customer name" className="w-full p-2 border-[1px] border-grey-300 rounded-lg" />
                        </td>
                   </tr>
                   <tr>
                       
                       <td className="text-sm  py-1">
                       <div className="text-sm font-normal text-gray-500 pr-6 py-1">
                            Customer Phone Number:
                       </div>
                            <input placeholder="Enter customer phone number" className="w-full p-2 border-[1px] border-grey-300 rounded-lg" />
                        </td>
                   </tr>
                   <tr>
                      
                       <td className="text-sm  py-1">
                       <div className="text-sm font-normal text-gray-500 pr-6 py-1">
                       Underwriting Company:
                       </div>
                            <input placeholder="Enter underwriting company ex:AMOD,HSB" className="w-full p-2 border-[1px] border-grey-300 rounded-lg" />
                        </td>
                   </tr>
                   <tr>
                       <td className="pt-3 ">
                       <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-between items-center m-auto mr-0 "
                           onClick={()=>{initiateOutbound(c)}}
                           >
                               <span >
                           <svg role="img" aria-hidden="true"  viewBox="0 0 20 20" fill="none" 
                           className="w-5 h-5 "
                           aria-labelledby="ChatIcon-857"><path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M3.302 2.755A3.458 3.458 0 015.466 2h2.268a3.468 3.468 0 013.322 2.476.5.5 0 00.959-.286A4.468 4.468 0 007.734 1H5.468a4.458 4.458 0 00-2.2 8.34v3.493a.5.5 0 00.853.353l2.267-2.266a.5.5 0 00-.708-.707l-1.413 1.413V9.037a.5.5 0 00-.286-.452 3.458 3.458 0 01-.68-5.83zm8.965 3.911a4.466 4.466 0 100 8.933h.36l3.253 3.254a.5.5 0 00.853-.354v-3.492A4.459 4.459 0 0019 11.134a4.469 4.469 0 00-4.466-4.468h-2.267zM9.816 8.682a3.466 3.466 0 012.451-1.016h2.267A3.467 3.467 0 0118 11.132a3.459 3.459 0 01-1.98 3.12.5.5 0 00-.287.451v2.589l-2.546-2.546a.5.5 0 00-.353-.147h-.567a3.466 3.466 0 01-2.451-5.917z"></path></svg>
                           </span>
                             <span className="text-sm ml-2">  Chat </span>
                           </button>
                       </td>
                   </tr>
                   
                   </tbody>
               </table>
               
            </div>

        </div>

    }
 
 </div>


</div>
      

    
  )
}
