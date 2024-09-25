import { state } from "./state";
import { results } from "./alerts";

export function getLocalStorage() {
  if (localStorage.getItem("userscore")) {
    let scores = localStorage.getItem("userscore").split(",");
    let resultArr = [];
    while (scores.length > 0) {
      resultArr.push(scores.slice(0, 4));
      scores.splice(0, 4);
    }

    resultArr.forEach((score) => {
      results.push(score);
      const scoreContainer = document.querySelector(".score-container");
      const resultContainer = document.createElement("li");
      resultContainer.classList.add("result");
      resultContainer.innerText = `Bombs found: ${score[0]}; Time: ${score[1]}s;  Steps: ${score[2]}; Cells opened:${score[3]}`;
      scoreContainer.append(resultContainer);
    });
  }
}

export function setState() {
  localStorage.setItem("userlvl", state.level.name);
  localStorage.setItem("usertheme", state.theme);
  localStorage.setItem("usersound", state.sound);
  localStorage.setItem("userbombs", state.bombcount);
}

