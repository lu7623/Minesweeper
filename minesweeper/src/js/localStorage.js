import { state } from "./state";
import { results } from "./alerts";
import { setTheme } from "./settings";
import { levels } from "./state";
import { changeLvl } from "./settings";
import { fieldReset } from "./settings";


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
    localStorage.setItem('userlvl', state.level.name);
    localStorage.setItem('usertheme', state.theme);
    localStorage.setItem('usersound', state.sound);
    localStorage.setItem('userbombs', state.bombcount);
}

export function getState() {
    if (localStorage.getItem("usersound")){
    const sound = document.getElementById('soundSet');
let usersound =  localStorage.getItem("usersound");
if (usersound == 'true') {
    sound.checked = true;
    state.sound = true
} else {
    sound.checked = false;
    state.sound = false;
}}
if (localStorage.getItem("usertheme")) {
    let theme =  localStorage.getItem("usertheme");
    state.theme = theme;
    const themes = document.getElementsByName("theme");
    themes.forEach(t => {
        if (t.value == theme) {t.checked = true}
    })
    setTheme();
}
if (localStorage.getItem("userlvl")) {
    let userlvl =  localStorage.getItem("userlvl");
    const levelsChange = document.getElementsByName("level");
    levelsChange.forEach(l => {
        if (l.value == userlvl) {
            l.checked = true;
        }
    })
    levels.forEach(lvl => {
        if (userlvl == lvl.name) {
            state.level = lvl;
            changeLvl();
        }
    })
}
if (localStorage.getItem("userbombs")) {
    let userbombs =  localStorage.getItem("userbombs");
    state.bombcount = userbombs;
    const bombsNumber = document.getElementById('bombs');
    bombsNumber.value = userbombs;
    fieldReset();
}
}