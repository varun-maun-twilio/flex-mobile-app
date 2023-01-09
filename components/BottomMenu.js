import { HiChatAlt2 , HiUserCircle} from "react-icons/hi";
import { useRouter } from 'next/router'
export default function BottomMenu({activeScreen}){


    const router = useRouter();

    const handleClick = (e,path) => {
        e.preventDefault()

        if(activeScreen!=path){
            router.push(path)
        }

        
      }
    

    return (
        <div className="w-full h-16 ">
	
	<section id="bottom-navigation" className="block h-16 fixed inset-x-0 bottom-0 z-10 bg-gray-50 shadow">
		<div id="tabs" className="flex  h-14 justify-between rounded-3xl overflow-hidden border-[1px] border-gray-300 mb-2">
			<a onClick={e=>handleClick(e,'/conversations')} className={"w-full justify-center inline-flex flex-col text-center pt-2 pb-1 "+((activeScreen=="/conversations")?" text-white bg-flex-blue ":"text-gray-400 bg-white")}>
                <HiChatAlt2 size={20} className="m-auto" />
				<span className="tab tab-home block text-sm">Conversations</span>
			</a>			
			<a  onClick={e=>handleClick(e,'/account')}  className={"w-full justify-center inline-flex flex-col text-center pt-2 pb-1 "+((activeScreen=="/account")?" text-white bg-flex-blue ":"text-gray-400  bg-white")}>
                <HiUserCircle size={20} className="m-auto" />				
				<span className="tab tab-account block text-sm">Account</span>
			</a>
		</div>
	</section>
</div>
    )
}