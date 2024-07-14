document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawingCanvas");
  const context = canvas.getContext("2d");
  const clearButton = document.getElementById("clearButton");

  let isDrawing = false;
  let startX, startY;

  const startDrawing = (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
  };

  const draw = (event) => {
    if (!isDrawing) return;

    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();

    startX = event.offsetX;
    startY = event.offsetY;
  };

  const stopDrawing = () => {
    isDrawing = false;
    saveDrawing();
  };

  const saveDrawing = () => {
    const drawingData = canvas.toDataURL();
    localStorage.setItem("drawing", drawingData);
  };

  const loadDrawing = () => {
    const drawingData = localStorage.getItem("drawing");
    if (drawingData) {
      const img = new Image();
      img.src = drawingData;
      img.onload = () => {
        context.drawImage(img, 0, 0);
      };
    }
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem("drawing");
  };

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseout", stopDrawing);
  clearButton.addEventListener("click", clearCanvas);

  loadDrawing();
});
