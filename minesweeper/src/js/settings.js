import { state } from "./state";
import { levels } from "./state";
import { createMatrix } from "./matrix";
import { stepsCount } from "./alerts";
import { setTimer } from "./timer";
import { stopTimer } from "./timer";
import { startTimer } from "./timer";

// settings button click

export function settingsSet() {
  const settingsBtn = document.querySelector(".btn");
  const settings = document.querySelector(".settings");
  settingsBtn.addEventListener("click", () => {
    if (!settingsBtn.classList.contains("btn-pressed")) {
      settingsBtn.classList.add("btn-pressed");
      settings.classList.remove("hide");
    } else {
      settingsBtn.classList.remove("btn-pressed");
      settings.classList.add("hide");
    }
  });

  // sound

const sound = document.getElementById('soundSet');
sound.addEventListener('change', () => {
  if (sound.checked) {state.sound = true}
  else {state.sound = false}
})

// change theme

  const themes = document.getElementsByName("theme");
  themes.forEach((theme) => {
    theme.addEventListener("change", function () {
      state.theme = this.value;
      console.log(state);
      setTheme();
    });
  });

  // change level 

const levelsChange = document.getElementsByName("level");
levelsChange.forEach((lvlChange) => {
    lvlChange.addEventListener("change", function () {
        levels.forEach(lvl => {
            if (lvlChange.value == lvl.name) {
                state.level = lvl;
                changeLvl();
            }
        })
  stopTimer();
  setTimer();
    });
  });

// restart 

const replay = document.querySelector('.replay');

replay.addEventListener ('click' , () => {
   fieldReset();
   stopTimer();
   setTimer();
})

// set bombs number

const bombsNumber = document.getElementById('bombs');
bombsNumber.addEventListener('change', () => {
  state.bombcount = bombsNumber.value;
  fieldReset();
  stopTimer();
  setTimer();
});

stepsCount();
setTimer();
}

export function fieldReset() {
  const field = document.querySelector('.field');
  field.replaceChildren();
      createMatrix();
      const counter = document.querySelector('.counter');
      counter.value = state.bombcount;
      counter.innerText = counter.value.toString().padStart(3, "0");
      state.steps = 0;
      field.removeEventListener('click', (e) => {
    
        state.steps +=1;
 
    })
    
}


function setTheme() {
  const cells = document.querySelectorAll(".cell");
  const body = document.querySelector("body");
  const field = document.querySelector(".field");
  const panel = document.querySelector(".panel");
  const gameContainer = document.querySelector(".gameContainer");
  const counter = document.querySelector(".counter");
  const replay = document.querySelector(".replay");
  const timer = document.querySelector(".timer");
  const score = document.querySelector(".score");
  const btn = document.querySelector(".btn");
  const settings = document.querySelector(".settings");
  const elements = [
    [body, "body"],
    [field, "field"],
    [panel, "panel"],
    [gameContainer, "gameContainer"],
    [counter, "counter"],
    [replay, "replay"],
    [timer, "timer"],
    [settings, "settings"],
    [btn, "btn"],
    [score, "score"],
  ];
  if (state.theme === "light") {
    elements.forEach((elem) => {
      elem[0].classList.add(`${elem[1]}-light`);
      elem[0].classList.remove(`${elem[1]}-dark`);
    });
    cells.forEach((cell) => {
      cell.classList.add("cell-light");
      cell.classList.remove("cell-dark");
    });
  } else {
    elements.forEach((elem) => {
      elem[0].classList.remove(`${elem[1]}-light`);
      elem[0].classList.add(`${elem[1]}-dark`);
    });
    cells.forEach((cell) => {
      cell.classList.remove("cell-light");
      cell.classList.add("cell-dark");
    });
  }
}


function changeLvl () {
   const field = document.querySelector('.field');
    if (state.level.height == 10) {
        field.classList.add("field-small");
        field.classList.remove("field-large");
        field.classList.remove("field-medium");
      } else if (state.level.height == 15) {
        field.classList.add("field-medium");
        field.classList.remove("field-large");
        field.classList.remove("field-small");
      } else if (state.level.height == 25) {
        field.classList.add("field-large");
        field.classList.remove("field-small");
        field.classList.remove("field-medium");
      }
      field.replaceChildren();
      createMatrix();
}