import { useRouter } from 'next/router'
import Image from 'next/image'
import { signOut as nextSignOut } from "next-auth/react"
import { HiUserCircle} from "react-icons/hi";
import { removeUserDetails } from '../../util/browserStateUtil';
import BottomMenu from '../../components/BottomMenu';
import iconImage from '../../public/static/images/flex-white-icon.png'
import { useEffect, useState } from 'react';
import BrowserStateUtil from "../../util/browserStateUtil"

export default function Account() {

  const router = useRouter();
  const [userDetails,setUserDetails] = useState();


  async function loadUserDetails(){
    setUserDetails(await BrowserStateUtil.fetchUserDetails());
  }

  useEffect(()=>{
    loadUserDetails();
  },[])


  async function signOut(){
   
    await nextSignOut({callbackUrl: "/api/auth/logout", });
    await removeUserDetails();
    router.push('/');
  }

  return (

    <div className="flex flex-col min-h-full   bg-gray-50" style={ {maxHeight: "-webkit-fill-available"}}>

<nav className="p-4 shadow bg-flex-blue  flex justify-start  items-center">
<Image
        src={iconImage}
        alt="Flex mobile Icon"
        height="30"
        width="30"
      />
            <span className="text-xl ml-6 leading-normal font-bold text-white">Flex Mobile</span>
            </nav>

  


       <div className="m-3 p-6 border-[1px] border-gray-300 rounded-lg bg-white flex items-center" >
          <div>
              <HiUserCircle size={50} className="m-auto" />	  
          </div>
          <div className="grow ml-6">
              <table>
                <tbody>
                  <tr>
                    <td>
                      Logged in as
                    </td>
                  </tr>
                  <tr>
                  <td>
                     {userDetails?.emailId || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>

          </div>

       </div>


       <div className="m-3">
           
           <h2 className="text-sm mb-1  font-bold text-gray-600">
                      Account Settings
                   </h2>
       </div> 

      <div className="grow overflow-y-auto scroll-smooth">
        <ul role="list" className="h-full  mx-3">          
          <li >
          <div className="block p-4 bg-white rounded-3xl shadow-md shadow-gray-200"  
        >
                <div className="flex items-center space-x-4">                    
                    <div className="flex-1 flex justify-between min-w-0 items-center">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Logout 
                        </p> 


                        <a className="block p-1 bg-gray-100 rounded-full " onClick={signOut}>
                        <svg className="w-8 h-8 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 20 20" aria-labelledby="ChevronRightIcon-1267">
                          
                          <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M5.409 3.5a1.528 1.528 0 00-1.004.404c-.264.25-.42.594-.405.965V15.13c-.015.37.14.716.405.965a1.529 1.529 0 001.004.404h6.182a.5.5 0 000-1H5.42a.529.529 0 01-.33-.132.255.255 0 01-.092-.199L5 15.143V4.83c-.004-.057.018-.13.09-.199a.528.528 0 01.33-.131h6.17a.5.5 0 000-1H5.41zm7.237 3.65a.5.5 0 01.708 0l2.5 2.5A.5.5 0 0116 10v.006a.5.5 0 01-.146.35l-2.5 2.5a.5.5 0 01-.708-.707l1.647-1.646H9a.5.5 0 010-1h5.293l-1.647-1.647a.5.5 0 010-.707z"></path>
                          </svg>
                        </a>
                    
                        
                                                 
                    </div>                    
                </div>
                </div>
          </li>
        </ul>
      </div>


      <BottomMenu activeScreen="/account" />

    </div>
  )

}