import { generateApp } from './generateApp';
import { getNeighbors } from './matrix';
import { state } from './state'

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
        bombcount += 1;
      }
    });
    if (bombcount) {
      this.setCellValue(bombcount);
    }
  }

  createCellonField(field) {
    
    
    const cellElem = document.createElement('div');
    this.cellElem = cellElem;
    cellElem.innerHTML = this.value || '';
cellElem.classList.add('cell');
if (state.theme == 'light') {
  cellElem.classList.add('cell-light')
} else {
  cellElem.classList.add('cell-dark')
}
    if (this.value) {
  cellElem.classList.add(`cell-${this.value}`)
    }
    field.append(cellElem);
  }
}

const field = generateApp();
console.log(field);
export function createCell(isBomb, coordinates) {
  const newCell = new Cell(isBomb, coordinates);
newCell.setType()
newCell.createCellonField(field);
  return new Cell();
}
