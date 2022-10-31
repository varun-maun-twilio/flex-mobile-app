const localforage = require("localforage");

module.exports = {
    fetchUserDetails:async ()=>{
       return localforage.getItem("flex-mobile-identity");
    },
    setUserDetails:async (userInfo)=>{
        return localforage.setItem("flex-mobile-identity",userInfo);
    },
    removeUserDetails:async ()=>{
        return localforage.removeItem("flex-mobile-identity");
    }

}