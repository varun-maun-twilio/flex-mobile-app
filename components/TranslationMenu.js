import { useEffect, useState } from "react";
import {HiRefresh} from "react-icons/hi";
import MiddlewareUtil from "../util/middlewareUtil";
export default function TranslationMenu({originalText,setNewMessageTranslated}){


  const [selectedLanguageCode,setSelectedLanguageCode] = useState("es");
  const [translatedText,setTranslatedText] = useState("");

    useEffect(()=>{
       

    },[translatedText]);



    const refreshTranslations = async ()=>{

      try{

        const resp = await  MiddlewareUtil.translateText(selectedLanguageCode,originalText);
        setTranslatedText(resp.translatedText);
        setNewMessageTranslated(resp.translatedText);
      }catch(e){
        console.error(e);
      }
      

    }



    return (
      <div className="relative w-full flex flex-col ">

<div className="flex-none text-sm font-medium">
  <div className="flex  h-14  justify-between items-center">
  <div class="flex-none  mr-4 ">
  <label for="languages" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language:</label>
  </div>
  <div class="flex-1 ">
  
<select id="languages" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

onChange={(e)=>setSelectedLanguageCode(e.target.value)}
>
  <option value="es" >Spanish</option>
  <option value="fr">French</option>
  <option  value="de" >German</option>
  <option value="it" >Italian</option>
</select>
  </div>

  </div>
</div> 

<div className="grow overflow-y-auto overflow-x-hidden scroll-smooth">

<textarea disabled readOnly value={translatedText} rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Translation Preview">
 
</textarea>
</div>
<div className="flex-none text-sm font-medium">
<div className="flex  h-14  justify-end items-center">
      
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
        onClick={()=>{refreshTranslations()}}


      >
          <HiRefresh size={30} />
         
          
      </button>
  </div>
</div> 

</div>
    )
}