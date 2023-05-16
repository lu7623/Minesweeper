import './sass/main.scss';

import { createMatrix } from './js/matrix';
import { startTimer } from './js/timer';
import { settingsSet } from './js/settings';

function startGame() {
  createMatrix();
  settingsSet();
}

startGame();
startTimer();
