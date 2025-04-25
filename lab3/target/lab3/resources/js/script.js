let X = 0;
let Y;
let R = 0;

let canvas = document.getElementById("graphic");
let ctx = canvas.getContext("2d");

let cellN = 12;
let cellX = canvas.width / cellN;
let cellY = canvas.height / cellN;

// EventListener кнопок проверки значений и сброса таблицы
document.addEventListener("DOMContentLoaded", function (){
    window.addEventListener("load", load_window);
});

function load_window() {
    setX();
    setR();
    redraw();
}

// Отрисовывание частей интерактивного элемента
function redraw() {
    draw_grid();

    if(R != 0) {
        draw_graphic(R);
    }

    entries = document.getElementById("hiddenForm:graphEntries").value;
    if(entries != null) {
        draw_points(entries);
    }
}

// Отрисовывание координатной сетки
function draw_grid() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Координатная сетка
    for(let i = 1; i <= cellN; i++) {
        ctx.beginPath();
        ctx.moveTo(0, cellY * i);
        ctx.lineTo(canvas.width, cellY * i);
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(cellX * i, 0);
        ctx.lineTo(cellX * i, canvas.height);
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Ось X
    ctx.beginPath();
    ctx.moveTo(0, cellY * 6);
    ctx.lineTo(canvas.width, cellY * 6);
    ctx.lineWidth = 5;
    ctx.stroke();

    // Стрелка оси X
    ctx.beginPath();
    ctx.moveTo(canvas.width, cellY * 6);
    ctx.lineTo(canvas.width - cellX/2, cellY * 6 + cellY/4);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(canvas.width, cellY * 6);
    ctx.lineTo(canvas.width - cellX/2, cellY * 6 - cellY/4);
    ctx.lineWidth = 5;
    ctx.stroke();

    // Ось Y
    ctx.beginPath();
    ctx.moveTo(cellX * 6, 0);
    ctx.lineTo(cellX * 6, canvas.height);
    ctx.lineWidth = 5;
    ctx.stroke();

    // Стрелка оси Y
    ctx.beginPath();
    ctx.moveTo(cellX * 6, 0);
    ctx.lineTo(cellX * 6 - cellX/4, 0 + cellY/2);
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cellX * 6, 0);
    ctx.lineTo(cellX * 6 + cellX/4, 0 + cellY/2);
    ctx.lineWidth = 5;
    ctx.stroke();

    return;
}

// Отрисовывание графика функции
function draw_graphic(r) {

    // Рисуем прямоугольник
    ctx.fillStyle = "blue";
    ctx.fillRect(cellX * 6 - cellX * r, cellY * 6 - cellY * r, cellX * r, cellY * r);

    // Рисуем треугольник
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(cellX * 6, cellY * 6);
    ctx.lineTo(cellX * 6 + cellX * r, cellY * 6);
    ctx.lineTo(cellX * 6, cellY * 6 + cellY * r / 2);
    ctx.closePath();
    ctx.fill();

    // Рисуем четверть круга
    ctx.beginPath();
    ctx.arc(cellX * 6, cellY * 6, r * cellX, Math.PI / 2, Math.PI);
    ctx.fillStyle = "blue";
    ctx.lineTo(cellX * 6, cellY * 6);
    ctx.fill();
}

// Отрисовывание точек из таблицы
function draw_points(entries) {  
    entries.split(" ").forEach(val => {
        let res = val.split(",");
        if (res.length > 2) {
            draw_point(res[0], res[1], res[2]);
        }
    })
}

function draw_point(x, y, isHit) {
    const radiuspoint = 0.1;

    ctx.beginPath();
    ctx.arc(cellX * 6 + cellX * x, cellY * 6 - cellY * y, radiuspoint * cellX, 0, 2 * Math.PI);
    //ctx.fillStyle = "purple";
    ctx.fillStyle = (isHit == 1) ? "green" : "red";
    ctx.lineTo(cellX * 6 + cellX * x, cellY * 6 - cellY * y);
    ctx.fill();
    
}

// Инициализация R текущим введённым значением
function setR() {
    let item = document.getElementById("inputForm:R");
    if(item != null) {
        let value = item.value;
        if(value != null) {
            R = parseFloat(value);
            return;
        }
    }

    R = 0;
}

// Инициализация X текущим введённым значением
function setX() {
    let item = document.getElementById("inputForm:X");
    if(item != null) {
        let value = item.value;
        if(value != null) {
            X = parseFloat(value);
            return;
        }
    }

    X = 0;
}

// Получение текущих координат мыши с интерактивного элемента при нажатии на него; отправка запроса на проверку координат
canvas.onclick = function (evt) {
    setR();
    if(R == 0) {
        alert("R не выбран");
        return;
    }

    let r = R;

    // Вычисляем x и y по координатам мыши
    let position = $(canvas).offset();
    let rowX = evt.pageX - position.left;
    let rowY = evt.pageY - position.top;

    let x = (rowX / cellX - 6).toFixed(2);
    let y = (6 - rowY / cellY).toFixed(2);

    document.getElementById("inputForm:X").value = x;
    document.getElementById("inputForm:Y").value = y;
    document.getElementById('inputForm:submit-button').click();
}

function updateX() {
    document.getElementById("inputForm:X").value = document.getElementById("inputForm:currX").value;
}

function updateY() {
    document.getElementById("inputForm:Y").value = document.getElementById("inputForm:currY").value;
}