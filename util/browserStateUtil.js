const localforage = require("localforage");

module.exports = {

    getAzureAccessToken:async ()=>{
        return localforage.getItem("flex-mobile-azure-access-token");
     },
     setAzureAccessToken:async (token)=>{
         return localforage.setItem("flex-mobile-azure-access-token",token);
     },

    fetchUserDetails:async ()=>{
       return localforage.getItem("flex-mobile-identity");
    },
    setUserDetails:async (userInfo)=>{
        return localforage.setItem("flex-mobile-identity",userInfo);
    },
    removeUserDetails:async ()=>{
        return localforage.dropInstance();
        //return localforage.removeItem("flex-mobile-identity");
    }

}