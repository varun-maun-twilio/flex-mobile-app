(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[960],{1148:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/conversations",function(){return n(2272)}])},6602:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(5893),i=n(3854),s=n(1163);function c(e){var t=e.activeScreen,n=(0,s.useRouter)(),c=function(e,r){e.preventDefault(),t!=r&&n.push(r)};return(0,r.jsx)("div",{className:"w-full",children:(0,r.jsx)("section",{id:"bottom-navigation",className:"block fixed inset-x-0 bottom-0 z-10 bg-white shadow",children:(0,r.jsxs)("div",{id:"tabs",className:"flex justify-between",children:[(0,r.jsxs)("a",{onClick:function(e){return c(e,"/conversations")},className:"w-full justify-center inline-block text-center pt-2 pb-1 "+("/conversations"==t?" text-red-500 ":""),children:[(0,r.jsx)(i.Upc,{size:20,className:"m-auto"}),(0,r.jsx)("span",{className:"tab tab-home block text-xs",children:"Conversations"})]}),(0,r.jsxs)("a",{onClick:function(e){return c(e,"/account")},className:"w-full justify-center inline-block text-center pt-2 pb-1 "+("/account"==t?" text-red-500 ":""),children:[(0,r.jsx)(i.mhe,{size:20,className:"m-auto"}),(0,r.jsx)("span",{className:"tab tab-account block text-xs",children:"Account"})]})]})})})}},2272:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return x}});var r=n(7568),i=n(655),s=n(5893),c=n(1163),o=n(7294),a=n(8100),l=n(7728),u=n.n(l),f=n(5954),d=n.n(f),h=n(6602);function x(){var e=(0,c.useRouter)(),t=(0,o.useState)(!1),n=t[0],l=t[1],f=(0,a.ZP)("loadClaims",function(){return m.apply(this,arguments)},{refreshInterval:5e3}),x=f.data;function m(){return(m=(0,r.Z)(function(){var e,t,n,r;return(0,i.__generator)(this,function(t){switch(t.label){case 0:return l(!0),[4,u().fetchUserDetails()];case 1:return e=t.sent().workerSid,[4,d().fetchClaims({workerSid:e})];case 2:return r=void 0===(n=t.sent().conversationList)?[]:n,l(!1),[2,r]}})})).apply(this,arguments)}return f.error,(0,s.jsxs)("div",{className:"flex flex-col min-h-screen ",children:[n&&(0,s.jsx)("div",{className:"p-16 flex text-center mx-auto items-center justify-center",children:(0,s.jsxs)("svg",{className:"mr-2 w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",viewBox:"0 0 100 101",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("path",{d:"M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",fill:"currentColor"}),(0,s.jsx)("path",{d:"M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",fill:"currentFill"})]})}),(0,s.jsx)("header",{className:"grow flex text-center mx-auto items-center justify-center",children:(0,s.jsx)("h2",{className:"text-2xl leading-normal mb-2 font-bold text-gray-800 dark:text-gray-100",children:"Conversation List"})}),null!=x&&x.length>0&&(0,s.jsx)("div",{className:"h-3/5 overflow-y-auto scroll-smooth",children:(0,s.jsx)("ul",{role:"list",className:"h-3/5 ",children:x.map(function(t){return(0,s.jsx)("li",{children:(0,s.jsx)("a",{className:"block py-4 px-4 border-y-[1px] border-slate-300",onClick:function(n){e.push("/conversations/".concat(t.key))},children:(0,s.jsx)("div",{className:"flex items-center space-x-4",children:(0,s.jsxs)("div",{className:"flex-1 flex justify-between min-w-0",children:[(0,s.jsx)("p",{className:"text-sm font-medium text-gray-900 truncate dark:text-white",children:t.key}),(0,s.jsx)("p",{children:t.customerPhoneNumber})]})})})},"convsid-"+t.key)})})}),(0,s.jsx)(h.Z,{activeScreen:"/conversations"})]})}},7728:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(932).Z,s=n(2401).Z,c=n(9483);e.exports={fetchUserDetails:i(function(){return s(this,function(e){return[2,c.getItem("flex-mobile-identity")]})}),setUserDetails:(r=i(function(e){return s(this,function(t){return[2,c.setItem("flex-mobile-identity",e)]})}),function(e){return r.apply(this,arguments)}),removeUserDetails:i(function(){return s(this,function(e){return[2,c.removeItem("flex-mobile-identity")]})})}},5954:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i,s,c=n(932).Z,o=n(2401).Z,a="https://zipwhip-functions-6497-mobile.twil.io";e.exports={fetchClaims:(r=c(function(e){return o(this,function(t){return[2,fetch("".concat(a,"/features/conversation/fetchConversationList"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workerSid:e})}).then(function(e){return e.json()}).then(function(e){return e.data})]})}),function(e){return r.apply(this,arguments)}),initializeTask:(i=c(function(e,t){return o(this,function(n){return[2,fetch("".concat(a,"/features/conversation/initiateOutbound"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({claimId:e,agentEmailId:t})}).then(function(e){return e.json()}).then(function(e){return e.data})]})}),function(e,t){return i.apply(this,arguments)}),endTask:(s=c(function(e){return o(this,function(t){return[2,fetch("".concat(a,"/features/conversation/parkInteraction"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({claimId:e})}).then(function(e){return e.json()}).then(function(e){return e.data})]})}),function(e){return s.apply(this,arguments)})}}},function(e){e.O(0,[556,105,32,774,888,179],function(){return e(e.s=1148)}),_N_E=e.O()}]);