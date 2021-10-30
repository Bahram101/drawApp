let canvas = document.getElementById("drawingCanvas");
let context = canvas.getContext("2d");
const range = document.getElementById("range");
const resultRange = document.getElementById("resultRange");
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
context.strokeStyle = "black";
context.lineWidth = 1;

let starIcon = false;
let sprayIcon = false;
let isDrawing = false;
let x = 0;
let y = 0;

canvas.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    if (starIcon) {
        isDrawing = false;
        startDrawStar(x, y, context.fillStyle, 5);
    } else {
        isDrawing = true;
    }
    // if (sprayIcon) {
    //     isDrawing = false;
    //     generateSprayPoints(e);
    // } else {
    //     isDrawing = true;
    // }
});

canvas.addEventListener("mousemove", (e) => {
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

canvas.addEventListener("mouseup", (e) => {
    isDrawing = false;
});

function drawLine(context, x1, y1, x2, y2, color, line) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = line;
    context.lineCap = 'round';
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
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

function changeColor(color) {
    context.strokeStyle = color;
    context.fillStyle = color;
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
            break;
        case "spray":
            sprayIcon = true;
            break;
    }
}

range.addEventListener("input", function () {
    resultRange.innerHTML = this.value;
    context.lineWidth = this.value;
});

const generateSprayPoints = (event) => {
    console.log("SPRAY");
    console.log("CLIENT", event);
    const amountOfPoints = context.lineWidth * 2;

    for (let i = 0; i < amountOfPoints; i++) {
        const offset = getRandomOffset(context.lineWidth * 2);
        const x = event.clientX + offset.x;
        const y = event.clientY + offset.y;

        context.fillStyle = context.strokeStyle;
        context.fillRect(x, y, 1, 1);
    }

    function getRandomOffset(radius) {
        const randomAngle = Math.random() * (2 * Math.PI);
        const randomRadius = Math.random() * radius;

        return {
            x: Math.cos(randomAngle) * randomRadius,
            y: Math.sin(randomRadius) * randomAngle,
        };
    }
};
