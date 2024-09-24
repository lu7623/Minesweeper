import { state } from "./state";
import { fieldReset } from "./settings";
import { setTimer } from "./timer";
import { stopTimer } from "./timer";
import { matrix } from "./matrix";

export function lose() {
  let msg = confirm("You lose! Play again!");
  if (msg) {
    fieldReset();
    stopTimer();
    setTimer();
  }
}

export let results = [];
export function win() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      }
    });
  });
  const timer = document.querySelector(".timer");
  state.time = timer.value;
  const scoreContainer = document.querySelector(".score-container");
  const cellsOpen = document.getElementById("cellsOpen");
  let result = [state.bombcount, state.time, state.steps, state.cellsOpen];
  results.unshift(result);
  if (results.length > 10) {
    results.pop();
  }
  localStorage.setItem("userscore", results);
  const resultContainer = document.createElement("li");
  resultContainer.classList.add("result");
  resultContainer.innerText = `Bombs found: ${state.bombcount}; Time: ${state.time}s;  Steps: ${state.steps}; ${cellsOpen.innerText}`;
  scoreContainer.prepend(resultContainer);
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
  const field = document.querySelector(".field");
  field.addEventListener("click", (e) => {
    state.steps += 1;
    let k = 0;
    const steps = document.getElementById("steps");
    steps.innerText = `Steps: ${state.steps}`;
    matrix.forEach((matrixLine) => {
      matrixLine.forEach((box) => {
        if (box.isOpenned) {
          k += 1;
        }
      });
    });
    const cellsOpen = document.getElementById("cellsOpen");
    state.cellsOpen = k;
    cellsOpen.innerText = `Cells opened: ${k}`;
  });
}
