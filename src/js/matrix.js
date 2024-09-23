import { createCell } from "./cell";
import { state } from "./state";
import { lose } from "./alerts";
import { stopTimer } from "./timer";
import { playSound } from "./sound";
import loseSound from '../assets/lose.mp3';

export let matrix = [];
export let empty = [];


function addBombs(bombcount) {
let currentBombs = bombcount;
const matrixHeight = matrix.length;
const matrixWidth = matrix[0].length;
while (currentBombs) {
    const x = Math.floor(Math.random()*(matrixHeight));
    const y = Math.floor(Math.random()*(matrixWidth));
    const matrixElem = matrix[y][x];
    if (matrixElem==0) {
        matrix[y][x] = 1;
        currentBombs -= 1;
    }
}
}

export function getNeighbors (coordinates) {
  const  {x, y} = coordinates;
  const n_1 = matrix[y - 1]?.[x];
  const n_2 = matrix[y - 1]?.[x + 1];
  const n_3 = matrix[y]?.[x + 1];
  const n_4 = matrix[y + 1]?.[x + 1];
  const n_5 = matrix[y + 1]?.[x];
  const n_6 = matrix[y + 1]?.[x - 1];
  const n_7 = matrix[y]?.[x - 1];
  const n_8 = matrix[y - 1]?.[x - 1];

  return [n_1, n_2, n_3, n_4, n_5, n_6, n_7, n_8].filter(
    (item) => typeof item !== "undefined"
  );
}

export function createMatrix(width = state.level.width, height = state.level.height, bombcount = state.bombcount) {
    matrix = Array.from({length: height}, () => Array.from({length: width}, () => 0 ));
    addBombs(bombcount);
    localStorage.setItem('usermatrix', matrix);
    empty.length =0;
    matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newCell = createCell(Boolean(matrixElem), { x, y });
    matrix[y][x] = newCell;
   
    if (!newCell.isBomb){

    empty.push(newCell);
    }
   })
   });
   const replay = document.querySelector('.replay');
   if (replay.classList.contains('replay-dead')) {
    replay.classList.remove('replay-dead');
    replay.classList.add('replay-smile')
    }
} 

export function openAllCells() {
  playSound(loseSound);
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      }
    });
  });

  stopTimer();
  setTimeout(lose, 500);
}