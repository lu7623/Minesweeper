const { state } = require("./state");

export function start() { 
    const timer = document.querySelector('.timer');
timer.value +=1;
timer.innerText = timer.value.toString().padStart(3, '0');
}

let intervalID;

 // Function to start setInterval call
 export function startTimer(){
    intervalID = setInterval(start, 1000);
    const field = document.querySelector('.field');
    field.classList.add('clicked');
}

// Function to stop setInterval call
export function stopTimer() {
    clearInterval(intervalID);
    const field = document.querySelector('.field');
    field.classList.remove('clicked');
    const timer = document.querySelector('.timer');
    state.time = timer.value;
    timer.value =0;
    timer.innerText = timer.value.toString().padStart(3, '0');
    field.removeEventListener('click', () => {
        if (timer.value == 0 && !field.classList.contains('clicked'))  {
        startTimer();}
      });
}




export function setTimer() {
    const field = document.querySelector('.field');
    const timer = document.querySelector('.timer');
    field.addEventListener('click', () => {
        if (timer.value == 0 && !field.classList.contains('clicked'))  {
        startTimer();}
      });
      
}



