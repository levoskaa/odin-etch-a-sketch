let gridSize = 16;

const grid = document.querySelector(".grid");
const gridSizeControl = document.querySelector("input[name=size]");

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
  grid.style.gridTemplateRows = `repeat(${size}, auto)`;
  grid.style.gridTemplateColumns = `repeat(${size}, auto)`;
}

function color() {
  this.classList.add("colored");
}

gridSizeControl.addEventListener("change", (e) => displayGrid(e.target.value));

displayGrid(gridSize);
