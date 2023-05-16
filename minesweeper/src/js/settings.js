import { state } from "./state";

export function settingsSet () {
const settingsBtn = document.querySelector('.btn');
const settings = document.querySelector('.settings');
settingsBtn.addEventListener('click', () => {
    if (!settingsBtn.classList.contains('btn-pressed')) {
    settingsBtn.classList.add('btn-pressed');
    settings.classList.remove('hide');
    } else {
        settingsBtn.classList.remove('btn-pressed');
    settings.classList.add('hide');
    }
})

const themes = document.getElementsByName('theme');
themes.forEach(theme  => {theme.addEventListener('change', function() {
   state.theme = this.value;
   console.log(state);
   setTheme();
  }); })
}
  function setTheme() {
      const cells = document.querySelectorAll('.cell');
    const body = document.querySelector('body');
    const field = document.querySelector('.field');
    const panel = document.querySelector('.panel');
    const gameContainer = document.querySelector('.gameContainer');
    const counter = document.querySelector('.counter');
    const replay = document.querySelector('.replay');
    const timer = document.querySelector('.timer');
    const score = document.querySelector('.score');
    const btn = document.querySelector('.btn');
    const settings = document.querySelector('.settings');
const elements = [[body, 'body'], [field, 'field'], [panel, 'panel'], [gameContainer, 'gameContainer'], [counter, 'counter'], [replay, 'replay'], [timer, 'timer'], [settings, 'settings'], [btn, 'btn'], [score, 'score']];
    if (state.theme === 'light') {
elements.forEach(elem => {
    elem[0].classList.add(`${elem[1]}-light`);
    elem[0].classList.remove(`${elem[1]}-dark`);
})
cells.forEach(cell => {
    cell.classList.add('cell-light');
    cell.classList.remove('cell-dark');
})
    } else {
        elements.forEach(elem => {
            elem[0].classList.remove(`${elem[1]}-light`);
            elem[0].classList.add(`${elem[1]}-dark`);
        })
        cells.forEach(cell => {
            cell.classList.remove('cell-light');
            cell.classList.add('cell-dark');
        })
    }
  }


