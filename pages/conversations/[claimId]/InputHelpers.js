import { useEffect, useState, useRef } from "react";
import {HiOutlineTranslate} from "react-icons/hi";
import CannedResponses from '../../../components/CannedResponses';
import TranslationMenu from '../../../components/TranslationMenu'
import {DebounceInput} from 'react-debounce-input';
export default function InputHelpers({newMessage,setNewMessage,setNewMessageTranslated}) {
    const [showTranslationPreview,setShowTranslationPreview] = useState(false);

    const [translatedTextPreview,setTranslatedTextPreview] = useState("");


    const menuItems = ["Autoreplies","Translations"]
    const [selectedMenuItem,setSelectedMenuItem] = useState(menuItems[0]);

    const toggleTranslationPreview=()=>{
        setShowTranslationPreview(old=>!old);
      }



     return (
        <div className="relative w-full h-full bg-neutral-100 flex flex-col">


<div className="flex-none text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">

        {
            menuItems.map(mi=>(mi==selectedMenuItem)?
            <li className="mr-2">
            <a  className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500" aria-current="page">
                {mi}
            </a>
        </li>
            :
            <li className="mr-2">
            <a onClick={()=>setSelectedMenuItem(mi)} className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">
                {mi}
            </a>
        </li>
            )
        }

    </ul>
</div>

<div className="grow p-2 overflow-y-auto overflow-x-hidden scroll-smooth">

{
    selectedMenuItem=="Autoreplies" &&
    <CannedResponses updateText={setNewMessage} />

}

{
    selectedMenuItem=="Translations" &&
    <TranslationMenu originalText={newMessage} setNewMessageTranslated={setNewMessageTranslated} />
}



</div>



    </div>
     ) 

}