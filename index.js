import './src/sass/main.scss';
import { matrix } from './src/js/matrix';
import { settingsSet } from './src/js/settings';

export function startGame() {
  matrix.createMatrix();
  settingsSet();
}

startGame();
