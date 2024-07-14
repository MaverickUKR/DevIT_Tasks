var canvas = document.getElementById("drawingCanvas");
var context = canvas.getContext("2d");
var clearButton = document.getElementById("clearButton");
var isDrawing = false;
var startX, startY;
var startDrawing = function (event) {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
};
var draw = function (event) {
    if (!isDrawing)
        return;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(event.offsetX, event.offsetY);
    context.stroke();
    startX = event.offsetX;
    startY = event.offsetY;
};
var stopDrawing = function () {
    isDrawing = false;
    saveDrawing();
};
var saveDrawing = function () {
    var drawingData = canvas.toDataURL();
    localStorage.setItem("drawing", drawingData);
};
var loadDrawing = function () {
    var drawingData = localStorage.getItem("drawing");
    if (drawingData) {
        var img_1 = new Image();
        img_1.src = drawingData;
        img_1.onload = function () {
            context.drawImage(img_1, 0, 0);
        };
    }
};
var clearCanvas = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    localStorage.removeItem("drawing");
};
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
clearButton.addEventListener("click", clearCanvas);
loadDrawing();
