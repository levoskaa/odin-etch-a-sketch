let gridSize = 16;
const drawingMode = {
  REGULAR: "regular",
  RAINBOW: "rainbow",
  INCREMENTAL: "incremental",
};
const BG_COLOR = "#e4e3e2";
const DEFAULT_COLOR = "#333";

const grid = document.querySelector(".grid");
const gridSizeControl = document.querySelector("input[name=size]");

function createGridCells(size) {
  const cells = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = `<div class="grid-cell" style="background-color: ${BG_COLOR}"></div>`;
      cells.push(cell);
    }
  }
  return cells.join("");
}

function displayGrid(size) {
  grid.innerHTML = createGridCells(size);
  grid
    .querySelectorAll(".grid-cell")
    .forEach((cell) => cell.addEventListener("mouseenter", onCellHover));
  grid.style.gridTemplateRows = `repeat(${size}, auto)`;
  grid.style.gridTemplateColumns = `repeat(${size}, auto)`;
}

function onCellHover() {
  const selectedDrawingMode = document.querySelector(
    "input[name=drawing-mode]:checked"
  ).value;

  switch (selectedDrawingMode) {
    case drawingMode.REGULAR:
      this.style.backgroundColor = DEFAULT_COLOR;
      break;
    case drawingMode.RAINBOW:
      this.style.backgroundColor = getRandomColor();
      break;
    case drawingMode.INCREMENTAL:
      let currentColor = rgb2hsl(this.style.backgroundColor);
      this.style.backgroundColor = darken(currentColor);
      break;
  }
}

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function darken(hslString) {
  const sep = hslString.indexOf(",") > -1 ? "," : " ";
  let [hue, sat, lght] = hslString
    // Slice out the part between parentheses
    .slice(4, -1)
    .split(sep);
  lght = parseFloat(lght.replace("%", ""));
  lght = Math.max(0, lght - 5);
  return `hsl(${hue}, ${sat}, ${lght}%)`;
}

// https://css-tricks.com/converting-color-spaces-in-javascript/#aa-rgb-to-hsl
function rgb2hsl(rgbString) {
  const sep = rgbString.indexOf(",") > -1 ? "," : " ";
  const rgbArr = rgbString
    // Slice out the part between parentheses
    .slice(4, -1)
    .split(sep)
    // Map values to 0-1 range
    .map((val) => val / 255);

  const [r, g, b] = rgbArr;
  const cmin = Math.min(r, g, b);
  const cmax = Math.max(r, g, b);
  const delta = cmax - cmin;
  let hue = 0;
  let sat = 0;
  let lght = 0;

  if (delta === 0) {
    hue = 0;
  } else if (cmax === r) {
    hue = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }

  lght = (cmax + cmin) / 2;
  sat = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lght - 1));
  sat = (sat * 100).toFixed(1);
  lght = (lght * 100).toFixed(1);

  return `hsl(${hue}, ${sat}%, ${lght}%)`;
}

gridSizeControl.addEventListener("change", (e) => displayGrid(e.target.value));

displayGrid(gridSize);
