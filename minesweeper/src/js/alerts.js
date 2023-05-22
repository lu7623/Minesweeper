import { state } from "./state"
import { fieldReset } from "./settings";
import { setTimer } from "./timer";
import { stopTimer } from "./timer";

export function lose() {
let msg = confirm('You lose! Play again');
if (msg) {
fieldReset();
stopTimer();
setTimer();
}
}

export function win () {
    stopTimer();
    let msg = confirm(`You win! Your result is: \n
    Bombs found: ${state.bombcount} \n
    Time: ${state.time} \n
    Steps: ${state.steps} \n
    Play again`);
    if (msg) {
        fieldReset(); 
        setTimer();
        }
}

export function stepsCount() {
    const field = document.querySelector('.field');
    field.addEventListener('click', (e) => {
    
        state.steps +=1;
 
    })
}