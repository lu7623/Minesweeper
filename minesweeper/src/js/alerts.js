import { state } from "./state"
import { fieldReset } from "./settings";
import { setTimer } from "./timer";

export function lose() {
let msg = confirm('You lose! Play again');
if (msg) {
fieldReset();
setTimer();
}
}

export function win () {
    alert(`You win! Your result is: \n
    Bombs found: ${state.bombcount} \n
    Time: ${ state.time} \n
    Steps: ${state.steps}`)
}

export function stepsCount() {
    const field = document.querySelector('.field');
    field.addEventListener('click', (e) => {
    
        state.steps +=1;
 
    })
}