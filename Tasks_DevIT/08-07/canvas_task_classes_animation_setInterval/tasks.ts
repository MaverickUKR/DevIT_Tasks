const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
const context = canvas.getContext("2d") as CanvasRenderingContext2D;
const clearButton = document.getElementById("clearButton") as HTMLButtonElement;

let isDrawing: boolean = false;
let startX: number, startY: number;

const startDrawing = (event: MouseEvent): void => {
  isDrawing = true;
  startX = event.offsetX;
  startY = event.offsetY;
};

const draw = (event: MouseEvent): void => {
  if (!isDrawing) return;

  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(event.offsetX, event.offsetY);
  context.stroke();

  startX = event.offsetX;
  startY = event.offsetY;
};

const stopDrawing = (): void => {
  isDrawing = false;
  saveDrawing();
};

const saveDrawing = (): void => {
  const drawingData = canvas.toDataURL();
  localStorage.setItem("drawing", drawingData);
};

const loadDrawing = (): void => {
  const drawingData = localStorage.getItem("drawing");
  if (drawingData) {
    const img = new Image();
    img.src = drawingData;
    img.onload = () => {
      context.drawImage(img, 0, 0);
    };
  }
};

const clearCanvas = (): void => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.removeItem("drawing");
};

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
clearButton.addEventListener("click", clearCanvas);

loadDrawing();
