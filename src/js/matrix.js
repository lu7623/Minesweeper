import { createCell } from "./cell";
import { state } from "./state";
import { lose } from "./alerts";
import { stopTimer } from "./timer";
import { playSound } from "./sound";
import loseSound from "../assets/lose.mp3";

export let matrix = [];
export let empty = [];

function addBombs(bombcount) {
  let currentBombs = bombcount;
  const matrixHeight = matrix.length;
  const matrixWidth = matrix[0].length;
  while (currentBombs) {
    const x = Math.floor(Math.random() * matrixHeight);
    const y = Math.floor(Math.random() * matrixWidth);
    const matrixElem = matrix[y][x];
    if (matrixElem == 0) {
      matrix[y][x] = 1;
      currentBombs -= 1;
    }
  }
}

const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
const dx = [-1, 0, 1, -1, 1, -1, 0, 1];

export function getNeighbors(coordinates) {
  const { x, y } = coordinates;
  const neighbors = [];
  for (let i = 0; i < 9; i++) {
    matrix[y + dy[i]]?.[x + dx[i]] && neighbors.push(matrix[y + dy[i]][x + dx[i]]);
  }

  return neighbors;
}

export function createMatrix(
  width = state.level.width,
  height = state.level.height,
  bombcount = state.bombcount
) {
  matrix = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => 0)
  );
  addBombs(bombcount);
  localStorage.setItem("usermatrix", matrix);
  empty.length = 0;
  matrix.forEach((matrixLine, y) => {
    matrixLine.forEach((matrixElem, x) => {
      const newCell = createCell(Boolean(matrixElem), { x, y });
      matrix[y][x] = newCell;

      if (!newCell.isBomb) {
        empty.push(newCell);
      }
    });
  });
  const replay = document.querySelector(".replay");
  if (replay.classList.contains("replay-dead")) {
    replay.classList.remove("replay-dead");
    replay.classList.add("replay-smile");
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
