import { state, levels } from "./state";
import { matrix } from "../../index";
import { stepsCount } from "./alerts";
import { setTimer, stopTimer } from "./timer";
import { setState, getLocalStorage } from "./localStorage";

export class Game {
  constructor() {
    this.scoreBtn = document.querySelector(".score");
    this.scoreContainer = document.querySelector(".score-container");
    this.counter = document.querySelector(".counter");
    this.field = document.querySelector(".field");
    this.replay = document.querySelector(".replay");
    this.settingsBtn = document.querySelector(".btn");
    this.settings = document.querySelector(".settings");
    this.bombsNumber = document.getElementById("bombs");
    this.cells = document.querySelectorAll(".cell");
    this.body = document.querySelector("body");
    this.panel = document.querySelector(".panel");
    this.gameContainer = document.querySelector(".gameContainer");
    this.cellsOpen = document.getElementById("cellsOpen");
    this.steps = document.getElementById("steps");
    this.sound = document.getElementById("soundSet");
    this.themes = document.getElementsByName("theme");
    this.levelsChange = document.getElementsByName("level");
    this.timer=document.querySelector(".timer");
  }

  setTheme() {
    const elements = [
      [this.body, "body"],
      [this.field, "field"],
      [this.panel, "panel"],
      [this.gameContainer, "gameContainer"],
      [this.counter, "counter"],
      [this.replay, "replay"],
      [this.timer, "timer"],
      [this.settings, "settings"],
      [this.settingsBtn, "btn"],
      [this.scoreBtn, "score"],
    ];
    if (state.theme === "light") {
      elements.forEach((elem) => {
        elem[0].classList.add(`${elem[1]}-light`);
        elem[0].classList.remove(`${elem[1]}-dark`);
      });
      this.cells.forEach((cell) => {
        cell.classList.add("cell-light");
        cell.classList.remove("cell-dark");
      });
    } else {
      elements.forEach((elem) => {
        elem[0].classList.remove(`${elem[1]}-light`);
        elem[0].classList.add(`${elem[1]}-dark`);
      });
      this.cells.forEach((cell) => {
        cell.classList.remove("cell-light");
        cell.classList.add("cell-dark");
      });
    }
  }
  
 changeLvl() {
    if (state.level.height == 10) {
      this.field.classList.add("field-small");
      this.field.classList.remove("field-large");
      this.field.classList.remove("field-medium");
    } else if (state.level.height == 15) {
      this.field.classList.add("field-medium");
      this.field.classList.remove("field-large");
      this.field.classList.remove("field-small");
    } else if (state.level.height == 25) {
      this.field.classList.add("field-large");
      this.field.classList.remove("field-small");
      this.field.classList.remove("field-medium");
    }
    this.field.replaceChildren();
    matrix.createMatrix();
  }

  fieldReset() {
    this.field.replaceChildren();
    matrix.createMatrix();   
    this.counter.value = state.bombcount;
    this.counter.innerText = this.counter.value.toString().padStart(3, "0");
    state.steps = 0;
    this.cellsOpen.innerText = `Cells opened: 0`;
    steps.innerText = `Steps: 0`;
    this.field.removeEventListener("click", () => {
      state.steps += 1;
    });
  }

  getSavedState() {
    if (localStorage.getItem("usersound")) {
      let usersound = localStorage.getItem("usersound");
      if (usersound == "true") {
        this.sound.checked = true;
        state.sound = true;
      } else {
        this.sound.checked = false;
        state.sound = false;
      }
    }
    if (localStorage.getItem("usertheme")) {
      let theme = localStorage.getItem("usertheme");
      state.theme = theme;
    
      this.themes.forEach((t) => {
        if (t.value == theme) {
          t.checked = true;
        }
      });
      this.setTheme();
    }
    if (localStorage.getItem("userlvl")) {
      let userlvl = localStorage.getItem("userlvl");
    
      this.levelsChange.forEach((l) => {
        if (l.value == userlvl) {
          l.checked = true;
        }
      });
      levels.forEach((lvl) => {
        if (userlvl == lvl.name) {
          state.level = lvl;
          this.changeLvl();
        }
      });
    }
    if (localStorage.getItem("userbombs")) {
      let userbombs = localStorage.getItem("userbombs");
      state.bombcount = userbombs;
      this.bombsNumber.value = userbombs;
      this.fieldReset();
    }
  }
  

  settingsSet()  {
    this.getSavedState();
    getLocalStorage();
    this.settingsBtn.addEventListener("click", () => {
      if (!this.settingsBtn.classList.contains("btn-pressed")) {
        this.settingsBtn.classList.add("btn-pressed");
        this.settings.classList.remove("hide");
      } else {
        this.settingsBtn.classList.remove("btn-pressed");
        this.settings.classList.add("hide");
      }
    });
  
    // sound
  

    this.sound.addEventListener("change", () => {
      if ( this.sound.checked) {
        state.sound = true;
      } else {
        state.sound = false;
      }
    });
  
    // change theme
  
    this.themes.forEach((theme) => {
      theme.addEventListener("change", function () {
        state.theme = this.value;
        this.setTheme();
      });
    });
  
    // change level
  
    this.levelsChange.forEach((lvlChange) => {
      lvlChange.addEventListener("change", function () {
        levels.forEach((lvl) => {
          if (lvlChange.value == lvl.name) {
            state.level = lvl;
            this.changeLvl();
          }
        });
        stopTimer();
        setTimer();
      });
    });
  
    // restart
  
    this.replay.addEventListener("click", () => {
      this.fieldReset();
      stopTimer();
      setTimer();
    });
  
    // set bombs number
  
    this.bombsNumber.addEventListener("change", () => {
      state.bombcount = bombsNumber.value;
      this.fieldReset();
      stopTimer();
      setTimer();
    });
  
    stepsCount();
    setTimer();
  
    //score save
  
    this.scoreBtn.addEventListener("click", () => {
      if (localStorage.userscore) {
        if (!this.scoreBtn.classList.contains("btn-pressed")) {
          this.scoreBtn.classList.add("btn-pressed");
          this.scoreContainer.classList.remove("hide");
        } else {
          this.scoreBtn.classList.remove("btn-pressed");
          this.scoreContainer.classList.add("hide");
        }
      }
    });
  
    window.addEventListener("beforeunload", setState);
  }
}
