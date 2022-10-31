import { useRouter } from 'next/router'


import { removeUserDetails } from '../../util/browserStateUtil';
import BottomMenu from '../../components/BottomMenu';

export default function Account() {

  const router = useRouter()


  async function signOut(){
    await removeUserDetails();
    router.push('/');
  }

  return (

    <div className="flex flex-col min-h-full " style={ {maxHeight: "-webkit-fill-available"}}>


      <header className="h-1/2 flex text-center mx-auto items-center justify-center">
        <h2 className="text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100">
          Account Settings
        </h2>
      </header>


      <div className="h-3/5 overflow-y-auto scroll-smooth">
        <ul role="list" className="h-3/5 ">          
          <li >
            <a className="block py-4 px-4 border-y-[1px] border-slate-300" onClick={signOut}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Logout
                  </p>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>


      <BottomMenu activeScreen="/account" />

    </div>
  )

}