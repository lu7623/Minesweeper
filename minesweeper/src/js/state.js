export const levels = [
    {
      width: 10,
      height: 10,
      bombcount: 10
    },
    {
      width: 15,
      height: 15,
      bombcount: 50
    },
    {
      width: 25,
      height: 25,
      bombcount: 99
    }
  ]
  
  export const state = {
    level: levels[2],
    sound: true,
    theme: 'dark'
  }
  
//   function setLocalStorage() {
//     localStorage.setItem("userstate", state);
//   }
//   window.addEventListener("beforeunload", setLocalStorage);
  
//   function getLocalStorage() {
//     if (localStorage.getItem("userstate")) {
//       state = localStorage.getItem("userstate");
//     }
//   }

//   window.addEventListener('load', function(){
//     getLocalStorage();})