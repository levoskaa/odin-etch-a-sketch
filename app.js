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
  grid.style.aspectRatio = gridWidth / gridHeight;
  sizeGrid();
}

function sizeGrid() {
  const gridBorder = getBorderWidthInPx(grid);
  const maxCellWidth = (window.innerWidth - 2 * gridBorder) / gridWidth;
  const maxCellHeight = (window.innerHeight - 2 * gridBorder) / gridHeight;
  const cellSize = Math.min(maxCellWidth, maxCellHeight);
  grid.style.gridTemplateRows = `repeat(${gridHeight}, minmax(0, ${cellSize}px))`;
  grid.style.gridTemplateColumns = `repeat(${gridWidth}, minmax(0, ${cellSize}px))`;
}

function getBorderWidthInPx(element) {
  // Captures digits and dots (a decimal number) that come before "px"
  // at the end of the string.
  // Example captures:
  // 1px -> 1,
  // 2.85px -> 2.85,
  // .9px -> .9
  const widthRegex = /([\d|.]+)px$/;
  const borderWidth = window
    .getComputedStyle(element)
    .borderWidth.match(widthRegex)[1];
  return parseFloat(borderWidth);
}

// TODO: debounce
window.addEventListener("resize", sizeGrid);

displayGrid(gridWidth, gridHeight);
