import "./src/sass/main.scss";
import { Matrix } from "./src/js/matrix";
import { Game } from "./src/js/game";
import {state} from "./src/js/state"

export const matrix = new Matrix(
  state.level.width,
  state.level.height,
  state.bombcount
);
export const game = new Game();
matrix.createMatrix();
game.settingsSet();
