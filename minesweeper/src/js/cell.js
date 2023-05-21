import { generateApp } from "./generateApp";
import { getNeighbors } from "./matrix";
import { state } from "./state";
import { openAllCells } from "./matrix";

class Cell {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
  }

  setCellValue(value) {
    this.value = value;
  }

  setType() {
    if (this.isBomb) {
      this.setCellValue("💣");
      return;
    }
    const neighbors = getNeighbors(this.coordinates);
    let bombcount = 0;
    neighbors.forEach((neighbor) => {
      if (neighbor === 1 || neighbor.isBomb) {
        bombcount++;
      }
    });
    if (bombcount) {
      this.setCellValue(bombcount);
    }
    
  }

  showCellValue() {
    this.cellElem.innerHTML = this.value || "";
  }

  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
    this.cellElem.innerHTML = isFlagged ? "🚩" : "";
    const counter = document.querySelector('.counter');
    if (counter.value>0) {
    counter.value-=1;}
    counter.innerText = counter.value.toString().padStart(3, "0");
  }

  open() {
    this.isOpenned = true;
    this.cellElem.classList.remove("cell-light");
    this.cellElem.classList.remove("cell-dark");
    this.cellElem.classList.add("cell-open");
    this.showCellValue();
  }

  onCellClick(allowOpenNumber = false) {
    if (this.isFlagged) {
      this.setFlag(false);
      const counter = document.querySelector('.counter');
      counter.value +=2;
      console.log(counter.value);
      counter.innerText = counter.value.toString().padStart(3, "0");
      return;
    }

    if (!this.value && !this.isOpenned) {
      this.open();
      const allNeighbors = getNeighbors(this.coordinates);
      console.log(allNeighbors);
      allNeighbors.forEach((neighbor) => {
        if (!neighbor.isOpenned) {
          neighbor.onCellClick(true);
        }
      });
    } else if (
      (this.value && allowOpenNumber) ||
      typeof this.value === "number"
    ) {
      this.open();
    } else if (this.isBomb) {
      openAllCells();
      const replay = document.querySelector('.replay');
      replay.classList.remove('replay-smile');
      replay.classList.add('replay-dead')
    }

    this.showCellValue();
  }
   createCellonField(field) {
    const cellElem = document.createElement("div");
    this.cellElem = cellElem;
    //cellElem.innerHTML = this.value || "";
    cellElem.classList.add("cell");
    if (state.theme == "light") {
      cellElem.classList.add("cell-light");
    } else {
      cellElem.classList.add("cell-dark");
    }
    if (this.value) {
      cellElem.classList.add(`cell-${this.value}`);
    }
   
    this.cellElem.addEventListener("click", () => this.onCellClick());
    this.cellElem.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      if (this.isFlagged) {this.onCellClick()}
      else {
      this.setFlag(true);}
    });

    field.append(cellElem);
  }
}

const field = generateApp();

export function createCell(isBomb, coordinates) {
  const newCell = new Cell(isBomb, coordinates);
  newCell.setCellValue();
    newCell.setType();
  newCell.createCellonField(field);
  return newCell;
}
