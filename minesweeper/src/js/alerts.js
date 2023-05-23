import { state } from "./state"
import { fieldReset } from "./settings";
import { setTimer } from "./timer";
import { stopTimer } from "./timer";
import { matrix } from "./matrix";

export function lose() {
    let msg = confirm('You lose! Play again!');
    if (msg) {
    fieldReset();
    stopTimer();
    setTimer();
    }
    }
    
    export function win () {
        const timer = document.querySelector('.timer');
        state.time = timer.value;
        let msg = confirm(`You win! Your result is: \n
        Bombs found: ${state.bombcount} \n
        Time: ${state.time} \n
        Steps: ${state.steps} \n
        Play again!`);
        if (msg) {
            stopTimer();
            fieldReset(); 
            setTimer();
            }
    }
    

export function stepsCount() {
    const field = document.querySelector('.field');
    field.addEventListener('click', (e) => {
        state.steps +=1;
        let k=0;
    const steps = document.getElementById('steps');
    steps.innerText = `Steps: ${state.steps}`;
    matrix.forEach((matrixLine) => {
        matrixLine.forEach((box) => {
          if (box.isOpenned) {
           k+=1;
          }
        });
      });
      console.log(matrix);
      const cellsOpen = document.getElementById('cellsOpen');
      cellsOpen.innerText = `Cells opened: ${k}`
    })
}