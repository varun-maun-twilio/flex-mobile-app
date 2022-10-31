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
        <div className="w-full">
	
	<section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
		<div id="tabs" className="flex justify-between">
			<a onClick={e=>handleClick(e,'/conversations')} className={"w-full justify-center inline-block text-center pt-2 pb-1 "+((activeScreen=="/conversations")?" text-red-500 ":"")}>
                <HiChatAlt2 size={20} className="m-auto" />
				<span className="tab tab-home block text-xs">Conversations</span>
			</a>			
			<a  onClick={e=>handleClick(e,'/account')}  className={"w-full justify-center inline-block text-center pt-2 pb-1 "+((activeScreen=="/account")?" text-red-500 ":"")}>
                <HiUserCircle size={20} className="m-auto" />				
				<span className="tab tab-account block text-xs">Account</span>
			</a>
		</div>
	</section>
</div>
    )
}