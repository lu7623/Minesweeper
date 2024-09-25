import { createCell } from "./cell";
import { lose } from "./alerts";
import { stopTimer } from "./timer";
import { playSound } from "./sound";
import loseSound from "../assets/lose.mp3";

export function getNeighbors(coordinates, matrix) {
  const dy = [-1, -1, -1, 0, 0, 1, 1, 1];
  const dx = [-1, 0, 1, -1, 1, -1, 0, 1];
  const { x, y } = coordinates;
  const neighbors = [];
  for (let i = 0; i < 9; i++) {
    matrix[y + dy[i]]?.[x + dx[i]] &&
      neighbors.push(matrix[y + dy[i]][x + dx[i]]);
  }

  return neighbors;
}

export class Matrix {
  constructor(width, height, bombcount) {
    this.width = width;
    this.height = height;
    this.bombcount = bombcount;
    this.matrix = [];
    this.empty = [];
  }

  addBombs() {
    let currentBombs = this.bombcount;
    const matrixHeight = this.height;
    const matrixWidth = this.width;

    while (currentBombs) {
      const x = Math.floor(Math.random() * matrixHeight);
      const y = Math.floor(Math.random() * matrixWidth);
      const matrixElem = this.matrix[y][x];
      if (matrixElem == 0) {
        this.matrix[y][x] = 1;
        currentBombs -= 1;
      }
    }
  }

  createMatrix() {
    this.matrix = Array.from({ length: this.height }, () =>
      Array.from({ length: this.width }, () => 0)
    );
    this.addBombs();
    localStorage.setItem("usermatrix", this.matrix);
    this.empty.length = 0;
    this.matrix.forEach((matrixLine, y) => {
      matrixLine.forEach((matrixElem, x) => {
        const newCell = createCell(Boolean(matrixElem), { x, y });
        this.matrix[y][x] = newCell;

        if (!newCell.isBomb) {
          this.empty.push(newCell);
        }
      });
    });
    const replay = document.querySelector(".replay");
    if (replay.classList.contains("replay-dead")) {
      replay.classList.remove("replay-dead");
      replay.classList.add("replay-smile");
    }
  }

  openAllCells() {
    playSound(loseSound);
    this.matrix.forEach((matrixLine) => {
      matrixLine.forEach((box) => {
        if (box.isBomb) {
          box.open();
        }
      });
    });

    stopTimer();
    setTimeout(lose, 500);
  }
}


