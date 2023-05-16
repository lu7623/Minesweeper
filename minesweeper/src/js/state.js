export const levels = [
    {
      name: 'easy',
      width: 10,
      height: 10,
      bombcount: 10
    },
    {
      name: 'medium',
      width: 15,
      height: 15,
      bombcount: 50
    },
    {
      name: 'hard',
      width: 25,
      height: 25,
      bombcount: 99
    }
  ]
  
  export const state = {
    level: levels[0],
    sound: true,
    theme: 'light'
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