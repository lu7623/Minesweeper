import { state } from "./state";
import { levels } from "./state";

export function generateApp() {
  const body = document.querySelector('body');
  const main = document.createElement('main');
  body.append(main);
  main.classList.add('main-container');
  const title = document.createElement('h1');
  title.innerText = 'RSS Minesweeper';
  title.classList.add('title');
  const gameContainer = document.createElement('div');
  gameContainer.classList.add('game-container');
  main.append(title);
  main.append(gameContainer);
  const settings = document.createElement('div');
  settings.classList.add('settings');
  const settingsIcon = document.createElement('div');
  settingsIcon.classList.add('top');
  settingsIcon.innerText = 'Settings';
  const topScore = document.createElement('div');
  topScore.classList.add('top');
  topScore.innerText = 'Top Score'
  const topPanel = document.createElement('div');
  topPanel.classList.add('top-panel');
  gameContainer.append(topPanel);
  topPanel.append(settingsIcon);
  topPanel.append(topScore);
  const sound = document.createElement('div');
  sound.classList.add('sound-check');
  const soundSet = document.createElement('span');
  soundSet.innerText = 'Sound';
  soundSet.id = 'soundSet';
  const soundLabel = document.createElement('label');
  soundLabel.classList.add('switch');
  const soundSwitch =  document.createElement('input');
soundSwitch.classList.add('optionsSwitch');
soundSwitch.setAttribute('type', 'checkbox');
soundSwitch.id = 'soundSet';
soundSwitch.checked = true;
const soundSpan = document.createElement('span');
soundSpan.classList.add('slider');
soundSpan.classList.add('round');
  soundLabel.append(soundSwitch);
  soundLabel.append(soundSpan);
  sound.append(soundSet);
  sound.append(soundLabel);
  settings.append(sound);
gameContainer.append(settings);
const themeCheck = document.createElement('div');
themeCheck.innerText = 'Appearence mode';
themeCheck.classList.add('theme-check');
settings.append(themeCheck);
const themes = ['light', 'dark'];
themes.forEach((theme) => {
const themeConteiner = document.createElement('div');
    themeConteiner.classList.add('theme');
    const themeInput = document.createElement('input');
    themeInput.setAttribute('type', 'radio');
    themeInput.id = theme;
    themeInput.name = 'theme';
    const themeLabel = document.createElement('label');
    themeLabel.innerText = theme;
    themeLabel.setAttribute('for', 'theme');
    themeConteiner.append(themeInput);
    themeConteiner.append(themeLabel);
    themeCheck.append(themeConteiner);
    if (theme === state.theme) {
      themeInput.checked = true;
}
  });
 
  const levelCheck = document.createElement('div');
  levelCheck.innerText = 'Difficulty level'
  levelCheck.classList.add('level-check');
  settings.append(levelCheck);
  const levels = ['easy', 'medium', 'hard'];
  levels.forEach((lvl) => {
    const levelConteiner = document.createElement('div');
    levelConteiner.classList.add('level');
    const check = document.createElement('input');
    check.setAttribute('type', 'radio');
    check.id = lvl;
    check.name = 'level';
    const label = document.createElement('label');
    label.innerText = lvl;
    if (lvl === state.level.name) {
      check.checked = true;
    }
    label.setAttribute('for', 'level');
    levelConteiner.append(check);
    levelConteiner.append(label);
    levelCheck.append(levelConteiner);
  });
  settings.append(levelCheck);
  const panel = document.createElement('div');
  panel.classList.add('panel');
  const counter = document.createElement('div');
  counter.classList.add('counter');
  counter.value = state.level.bombcount;
  counter.innerText = counter.value.toString().padStart(3, '0');
  const replay = document.createElement('div');
  replay.classList.add('replay');
  const timer = document.createElement('div');
  timer.classList.add('timer');
  timer.value = 0;
  timer.innerText = timer.value.toString().padStart(3, '0');
  gameContainer.append(panel);
  panel.append(counter);
  panel.append(replay);
  panel.append(timer);
  const field = document.createElement('div');
  field.classList.add('field');
  if (state.level.height == 10)
  {field.classList.add('field-small')}
  else if (state.level.height == 15)
  {field.classList.add('field-medium')}
  else if (state.level.height == 25)
  {field.classList.add('field-large')}
  if (state.theme == 'light') {
    field.classList.add('field-light');
    panel.classList.add('panel-light');
    counter.classList.add('counter-light');
    timer.classList.add('timer-light');
    replay.classList.add('replay-light');
    gameContainer.classList.add('game-container-light')
  } else {
    field.classList.add('field-dark');
    panel.classList.add('panel-dark');
    counter.classList.add('counter-dark');
    timer.classList.add('timer-dark');
    replay.classList.add('replay-dark');
    gameContainer.classList.add('game-container-dark');
    body.classList.add('dark');
  }
  gameContainer.append(field);
  return(field);
}
