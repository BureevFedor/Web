let X;
let Y;
let R = 0;

let min_x = -6, max_x = 6, min_y = -6, max_y = 6;

let canvas = document.getElementById("graphic");
let ctx = canvas.getContext("2d");

let cellN = 12;
let cellX = canvas.width / cellN;
let cellY = canvas.height / cellN;

// EventListener кнопок проверки значений и сброса таблицы
document.addEventListener("DOMContentLoaded", function (){
    document.getElementById("submit-button").addEventListener("click", submit);
    window.addEventListener("load", load_window);
    document.getElementById("reset-button").addEventListener("click", reset);
});

function load_window() {
    initX();
    initY();
    initR();

    redraw();
}

// Изменение R
function changeR() {
    if (checkR()) {
        redraw();
    }
}

// Отрисовывание частей интерактивного элемента
function redraw() {
    draw_grid();

    let r = R;
    if(r != 0) {
        draw_graphic(r);
    }

    entries = document.getElementById("entries").innerHTML;
    draw_points(entries);
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
    ctx.fillRect(cellX * 6 - cellX * r / 2, cellY * 6 - cellY * r, cellX * r / 2, cellY * r);

    // Рисуем треугольник
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(cellX * 6, cellY * 6);
    ctx.lineTo(cellX * 6 + cellX * r / 2, cellY * 6);
    ctx.lineTo(cellX * 6, cellY * 6 + cellY * r / 2);
    ctx.closePath();
    ctx.fill();

    // Рисуем четверть круга
    ctx.beginPath();
    ctx.arc(cellX * 6, cellY * 6, r * cellX, -Math.PI / 2, 0);
    ctx.fillStyle = "blue";
    ctx.lineTo(cellX * 6, cellY * 6);
    ctx.fill();
}

// Отрисовывание точек из таблицы
function draw_points(entries) {
    //var entries = localStorage.getItem("entries");
    
    entries.split(" ").forEach(val => {
        let res = val.split(",");
        if (res.length > 1) {
            draw_point(res[0], res[1]);
        }
    })
}

function draw_point(x, y) {
    const radiuspoint = 0.1;

    ctx.beginPath();
    ctx.arc(cellX * 6 + cellX * x, cellY * 6 - cellY * y, radiuspoint * cellX, 0, 2 * Math.PI);
    ctx.fillStyle = "purple";
    //ctx.fillStyle = isHit ? "green" : "red";
    ctx.lineTo(cellX * 6 + cellX * x, cellY * 6 - cellY * y);
    ctx.fill();
    
}

// Инициализация X последними сохраненными значениями
function initX() {
    let last = document.getElementById("LastX").innerHTML.trim();

    last.split(" ").forEach(val => {
        for (var i = 1; i <= 9; i++) {
            let item = document.getElementById("x-checkbox" + i);
            if (item != null) {
                if (item.value == val) {
                    item.checked = true;
                    break;
                }
            }
        }
    })
}

// Инициализация Y последним сохраненным значением
function initY() {
    let last = document.getElementById("LastY").innerHTML.trim();

    if (last == "") {
        Y = 0;
        return;
    }

    Y = parseFloat(last);

    let Y_text = document.getElementById("Y");
    if (Y_text != null) {
        Y_text.value = last;
    }
}

// Инициализация R последним сохраненным значением
function initR() {
    let last = document.getElementById("LastR").innerHTML.trim();

    if (last == "") {
        R = 0;
        return;
    }

    R = parseFloat(last);

    for (var i = 1; i <= 5; i++) {
        let item = document.getElementById("R" + i);
        if (item != null) {
            if (item.value == last) {
                item.checked = true;
                break;
            }
        }
    }
}

// Проверка корректности введённых значений X (checkbox)
function checkX(){
    let formData = new FormData(document.getElementById("inputForm"));

    X = [];
    for (var i = 1; i <= 9; i++) {
        if(document.getElementById("x-checkbox" + i).checked) {
            X.push(formData.get("x" + i));
        }
    }

    if(X.length == 0) {
        document.getElementById("x-checkbox1").setCustomValidity("Выберите хотя бы один из элементов X");
        return false;
    }

    document.getElementById("x-checkbox1").setCustomValidity("");
    return true;
}

// Проверка корректности введённых значений Y (text)
function checkY(){
    let Y_text = document.getElementById("Y");
    Y = Y_text.value.replace(",", ".");

    if (Y.trim() === ""){
        Y_text.setCustomValidity("Заполните поле");
        return false;
    } else if (!isFinite(Y)){
        Y_text.setCustomValidity("Должно быть число!");
        return false;
    } else if (Y > 5 || Y < -5){
        Y_text.setCustomValidity("Вы вышли за диапазон [-5; 5]!");
        return false;
    }

    Y_text.setCustomValidity("");
    return true;
}

// Проверка корректности введённых значений R (radio buttons)
function checkR(){
    let formData = new FormData(document.getElementById("inputForm"));
    
    for (var i = 1; i <= 5; i++) {
        if(document.getElementById("R" + i).checked) {
            R = formData.get("r");
            return true;
        }
    }

    R = 0;
    document.getElementById("R1").setCustomValidity("Необходимо выбрать R");
    return false;
}

// Функция отправки значений серверу (вызывается по кнопке "Проверка по правильности")
const submit = function (e){
    if (!checkX()) return;
    if (!checkY()) return;
    if (!checkR()) return;
    e.preventDefault();

    let request = "";

    for (let i = 0; i < X.length; i++) {
        if(i == 0) {
            request += '?x=' + X[i];    
        } else {
            request += '&x=' + X[i];
        }
    }
    if(Y != "") {
        if(request == "") {
            request += "?y=" + Y;
        } else {
            request += '&y=' + Y;
        }
    }
    if(R != "") {
        if(request == "") {
            request += "?r=" + R;
        } else {
            request += '&r=' + R;
        }
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                window.location.href = 'result.jsp';
                //$('tbody#tableBody').html(data);
                //document.getElementById("entries").innerHTML = data;
                /*
                $.ajax({
                    url: 'table.jsp',
                    success: function (data) {
                        $('tbody#tableBody').html(data);
                    }
                });
                $.ajax({
                    url: 'entries.jsp',
                    success: function (data) {
                        //localStorage.setItem("entries", data);
                        document.getElementById("entries").innerHTML = data;
                        draw_points(data);
                    }
                });
                */
            }
        }
    }
    xhr.open('POST', "/lab2_good/ControllerServlet" + request, true);
    xhr.send(null);
};

// Функция очистки таблицы
function reset() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //localStorage.setItem("entries", "");
                window.location.reload();
            }
        }
    }
    xhr.open('POST', "/lab2_good/ControllerServlet" + "?reset=1", true);
    xhr.send(null);   
}

// Получение текущих координат мыши с интерактивного элемента при нажатии на него; отправка запроса на проверку координат
canvas.onclick = function (evt) {
    if(!checkR()) {
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

    let request = "?x=" + x + "&y=" + y + "&r=" + r;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                draw_point(x, y);
                entries = document.getElementById("entries").innerHTML + " " + x + "," + y;
                document.getElementById("entries").innerHTML = entries;
                //localStorage.setItem("entries", localStorage.getItem("entries") + " " + x + "," + y);
                $.ajax({
                    url: 'table.jsp',
                    success: function (data) {
                        $('tbody#tableBody').html(data);
                    }
                });
            }
        }
    }
    xhr.open('POST', "/lab2_good/ControllerServlet" + request, true);
    xhr.send(null);
}
