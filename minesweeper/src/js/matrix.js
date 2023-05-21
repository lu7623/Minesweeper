import { generateRandom } from "./getRandom";
import { createCell } from "./cell";
import { state } from "./state";

export let matrix = [];

function addBombs(bombcount) {
let currentBombs = bombcount;
const matrixHeight = matrix.length;
const matrixWidth = matrix[0].length;
while (currentBombs) {
    const x = generateRandom(0, matrixWidth-1);
    const y = generateRandom(0, matrixHeight-1);
    const matrixElem = matrix[y][x];
    if (!matrixElem) {
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
    console.log(matrix); 
    addBombs(bombcount);
    matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newCell = createCell(Boolean(matrixElem), { x, y });
    matrix[y][x] = newCell;
   })
   });
   const replay = document.querySelector('.replay');
   if (replay.classList.contains('replay-dead')) {
    replay.classList.remove('replay-dead');
    replay.classList.add('replay-smile')
    }
} 

export function openAllCells() {
  matrix.forEach((matrixLine) => {
    matrixLine.forEach((box) => {
      if (box.isBomb) {
        box.open();
      }
    });
  });
}