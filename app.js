const grid = document.querySelector(".grid");

function createGridCells(width, height) {
  const cells = [];
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const cell = "<div></div>";
      cells.push(cell);
    }
  }
  return cells.join("");
}

grid.innerHTML = createGridCells(16, 16);
