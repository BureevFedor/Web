import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch, connect } from "react-redux";

import UserStore from './store/UserStore';
import RadiusStore from './store/RadiusStore';
import EntriesStore from './store/EntriesStore';
import { addEntry, update, clear } from './store/EntriesActions'

var XVal = 0;
var YVal = 0;
var RVal = RadiusStore.getState().radius;

const Canvas = () => {

    const dispatch = useDispatch();

    var entries = useSelector(state => state.reducer)

    const Ref = useRef(null);
    var canvas = Ref.current;

    async function updateAll() {
        //let promise = new Promise(loadEntries());
        //promise.then(redraw());
    }
    
    // Загрузить точки из БД
    async function loadEntries() {
        console.log("STARTING LOAD ENTRIES");
        dispatch(clear());

        const promiseAwait = new Promise((resolve, reject) => {
            const response = axios.post('http://localhost:8080/lab4-backend-1.0-SNAPSHOT/api/entries/observe', 
                JSON.stringify(
                    { 
                        username: UserStore.getState().username,
                        password: UserStore.getState().password
                    }
                ), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            resolve(response);
        });

        promiseAwait.then( (value) => 
            value.data.dots.map((item) => {

                var x = parseFloat(item.coordinateX.replace(',', '.')).toFixed(2);
                var y = parseFloat(item.coordinateY.replace(',', '.')).toFixed(2);
                var r = parseFloat(item.radius.replace(',', '.')).toFixed(2);

                dispatch(addEntry(                
                    { 
                        coordinateX: x,
                        coordinateY: y,
                        radius: r,
                        result: item.result,
                        currentTime: item.currentTime
                    }
                ))
            })
        ).then(console.log("ENDING LOAD ENTRIES"))
    }
    
    // Добавить точку в базу данных и снова выгрузить таблицу из бд (обновить полностью)
    async function addPoint() {
        try {
            const result = await axios.post('http://localhost:8080/lab4-backend-1.0-SNAPSHOT/api/entries/add', 
                JSON.stringify(
                    { 
                        coordinateX: parseFloat(XVal).toFixed(2),
                        coordinateY: parseFloat(YVal).toFixed(2),
                        radius: parseFloat(RVal).toFixed(2),
                        username: UserStore.getState().username,
                        password: UserStore.getState().password
                    }
                ), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("result of addpoint in canvas" + result);
            loadEntries();
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            console.log(err);
        }
    }

    useEffect(()=> {
        console.log("useEffect CANVAS");
        redraw();
    });

    // Отрисовывание координатной сетки
    function draw_grid() {
        console.log("draw_grid")
        canvas = Ref.current;
        const ctx = canvas.getContext("2d");

        let cellN = 12;
        let cellX = canvas.width / cellN;
        let cellY = canvas.height / cellN;

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
    }

    // Отрисовывание графика функции
    function draw_graphic(r) {
        console.log("draw_graphic")
        canvas = Ref.current;
        const ctx = canvas.getContext("2d");

        let cellN = 12;
        let cellX = canvas.width / cellN;
        let cellY = canvas.height / cellN;

        // Рисуем прямоугольник
        ctx.fillStyle = "purple";
        ctx.fillRect(cellX * 6 - cellX * r, cellY * 6 - cellY * r / 2, cellX * r, cellY * r / 2);

        // Рисуем треугольник
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(cellX * 6, cellY * 6);
        ctx.lineTo(cellX * 6 + cellX * r / 2, cellY * 6);
        ctx.lineTo(cellX * 6, cellY * 6 - cellY * r);
        ctx.closePath();
        ctx.fill();

        // Рисуем четверть круга
        ctx.beginPath();
        ctx.arc(cellX * 6, cellY * 6, r * cellX, 0, Math.PI / 2);
        ctx.fillStyle = "cyan";
        ctx.lineTo(cellX * 6, cellY * 6);
        ctx.fill();
    }

    // Функция перерисовки всего канваса (сначала сетки, затем графика, затем точек)
    function redraw() {
        console.log("STARTNG REDRAW " + RVal);
        draw_grid();
        draw_graphic(RVal);
        draw_points();
        console.log("ENDING REDRAW");
    }

    // Отрисовывание точек из таблицы
    function draw_points() { 
        console.log("draw_points (" + entries.length + " points)"); 
        canvas = Ref.current;
        entries.map((item) => {
            //var x = parseFloat(item.coordinateX.replace(',', '.')).toFixed(2);
            //var y = parseFloat(item.coordinateY.replace(',', '.')).toFixed(2);
            draw_point(item.coordinateX, item.coordinateY, item.result);
        })
    }

    function draw_point(x, y, result) {
        canvas = Ref.current;
        const ctx = canvas.getContext("2d");

        let cellN = 12;
        let cellX = canvas.width / cellN;
        let cellY = canvas.height / cellN;

        const radiuspoint = 0.1;
    
        ctx.beginPath();
        ctx.arc(cellX * 6 + cellX * x, cellY * 6 - cellY * y, radiuspoint * cellX, 0, 2 * Math.PI);
        //ctx.fillStyle = "purple";
        ctx.fillStyle = (result == "HIT") ? "green" : "red";
        ctx.lineTo(cellX * 6 + cellX * x, cellY * 6 - cellY * y);
        ctx.fill(); 
    }

    // Получение текущих координат мыши с интерактивного элемента при нажатии на него
    const handleClick = (event) => {
        let cellN = 12;
        let cellX = canvas.width / cellN;
        let cellY = canvas.height / cellN;

        // Вычисляем x и y по координатам мыши
        const localX = event.clientX - event.target.offsetLeft;
        const localY = event.clientY - event.target.offsetTop;
        //console.log(localX + " " + localY + "AAAAA");

        XVal = (localX / cellX - 6);
        YVal = (6 - localY / cellY);
        RVal = parseFloat(RadiusStore.getState().radius);
        console.log(XVal + " " + YVal + " " + RVal + " BBBBB");

        if(RVal > 0) {
            addPoint();
        }
    };

    return (
        <div className="canvas">
            <canvas id="graphic" height="500" width="500" ref={Ref} onClick={handleClick}></canvas>
        </div>
    );
}

export default Canvas