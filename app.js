let gridSize = 16;

const grid = document.querySelector(".grid");

function createGridCells(size) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = '<div class="grid-cell"></div>';
      cells.push(cell);
    }
  }
  return cells.join("");
}

function displayGrid(size) {
  grid.innerHTML = createGridCells(size);
  grid
    .querySelectorAll(".grid-cell")
    .forEach((cell) =>
      cell.addEventListener("mouseenter", color, { once: true })
    );
  sizeGrid();
}

function sizeGrid() {
  const gridBorder = getBorderWidthInPx(grid);
  const maxCellWidth = (window.innerWidth - 2 * gridBorder) / gridSize;
  const maxCellHeight = (window.innerHeight - 2 * gridBorder) / gridSize;
  const cellSize = Math.min(maxCellWidth, maxCellHeight);
  grid.style.gridTemplateRows = `repeat(${gridSize}, minmax(0, ${cellSize}px))`;
  grid.style.gridTemplateColumns = `repeat(${gridSize}, minmax(0, ${cellSize}px))`;
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

function color() {
  this.classList.add("colored");
}

// TODO: debounce
window.addEventListener("resize", sizeGrid);

displayGrid(gridSize);
