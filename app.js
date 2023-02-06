const grid = document.querySelector(".grid");
let gridWidth = 16;
let gridHeight = 16;

function createGridCells(width, height) {
  const cells = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = '<div class="grid-cell"></div>';
      cells.push(cell);
    }
  }
  return cells.join("");
}

function displayGrid(width, height) {
  grid.innerHTML = createGridCells(width, height);
  sizeGrid();
}

function sizeGrid() {
  const maxCellWidth = window.innerWidth / gridWidth;
  const maxCellHeight = window.innerHeight / gridHeight;
  const cellSize = Math.min(maxCellWidth, maxCellHeight);
  grid.style.gridTemplate = `repeat(${gridWidth}, ${cellSize}px) / repeat(${gridHeight}, ${cellSize}px)`;
}

window.addEventListener("resize", sizeGrid);

displayGrid(gridWidth, gridHeight);
