import './sass/main.scss';

import { createMatrix } from './js/matrix';

import { settingsSet } from './js/settings';


export function startGame() {
  createMatrix();
  settingsSet();
}

startGame();


