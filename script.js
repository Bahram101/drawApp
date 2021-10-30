// const canvas = document.getElementById("canvas");
// const context = canvas.getContext("2d");

let canvas = document.getElementById("drawingCanvas");
let context = canvas.getContext("2d");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
context.strokeStyle = "black";
context.lineWidth = 1;

let starIcon = false;
let isDrawing = false;
let x = 0;
let y = 0;

canvas.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    if (starIcon) {
        isDrawing = false;
        startDrawStar(x, y, 'red', 5);
    } else {
        isDrawing = true;
    }
});

canvas.addEventListener("mousemove", (e) => {
    console.log("isDrawing", isDrawing);
    if (isDrawing === true) {
        drawLine(
            context,
            x,
            y,
            e.offsetX,
            e.offsetY,
            context.stroke,
            context.lineWidth
        );
        x = e.offsetX;
        y = e.offsetY;
    }
});

window.addEventListener("mouseup", (e) => {
    isDrawing = false;
});

function drawLine(context, x1, y1, x2, y2, color, line) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = line;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function changeTool(param) {
    switch (param) {
        case "pencil":
            starIcon = false;
            context.lineWidth = 1;
            break;
        case "brush":
            starIcon = false;
            context.lineWidth = 25;
            break;
        case "marker":
            starIcon = false;
            context.lineWidth = 5;
            break;
        case "cleaner":
            starIcon = false;
            context.lineWidth = 25;
            context.strokeStyle = "white";
            console.log(context.lineWidth);
            break;
        case "star":
            starIcon = true;
            // drawStar(centerX,centerY,points,outer,inner,fill,stroke,line);
            break;
    }
}

function changeColor(color) {
    context.strokeStyle = color;
    context.fillStyle = color;
}

function startDrawStar(x, y, background, lineWidth) {
    drawStar(x, y, 5, 60, 25, background, "gray", lineWidth);
}

function drawStar(centerX, centerY, points, outer, inner, fill, stroke, line) {
    context.beginPath();
    context.moveTo(centerX, centerY + outer);
    for (var i = 0; i < 2 * points + 1; i++) {
        var r = i % 2 == 0 ? outer : inner;
        var a = (Math.PI * i) / points;
        context.lineTo(centerX + r * Math.sin(a), centerY + r * Math.cos(a));
    }
    context.closePath();
    context.fillStyle = fill;
    context.fill();
    context.strokeStyle = stroke;
    context.lineWidth = line;
    context.stroke();
}
