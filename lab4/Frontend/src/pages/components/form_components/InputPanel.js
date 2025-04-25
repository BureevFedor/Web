import axios from "axios";
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RadiusStore from './store/RadiusStore';
import UserStore from './store/UserStore';
import { addEntry, clear } from './store/EntriesActions'

var XVal = 0;
var YVal = 0;
var RVal = RadiusStore.getState().radius;

const InputPanel = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate(); 

    // Добавить точку в базу даннных
    async function addPoint() {
        //console.log("addPoint from inputPanel!");
        try {
            const result = await axios.post('http://localhost:8080/lab4-backend-1.0-SNAPSHOT/api/entries/add', 
                JSON.stringify(
                    { 
                        coordinateX: parseFloat(XVal),
                        coordinateY: parseFloat(YVal),
                        radius: parseFloat(RVal),
                        username: UserStore.getState().username,
                        password: UserStore.getState().password
                    }
                ), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("result of addpoint in inputpanel" + result);
            loadEntries();
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            console.log(err);
            console.log("BADABABABABABABABA");
        }
    }

    // Очистить таблицу в базе данных
    async function clearPoints() {
        try {
            const result = await axios.post('http://localhost:8080/lab4-backend-1.0-SNAPSHOT/api/entries/clear', 
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
            console.log("result of clear in inputpanel" + result);
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            console.log(err);
        }
    }

    // Загрузить точки из БД
    async function loadEntries() {
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
        );
    }
    
    // Зайти на страницу
    const exit = () =>{ 
        loadEntries();
        let path = '../login'; 
        navigate(path);
    }

    const setX = (xParam) => {
        XVal = xParam;
        console.log(XVal);
    }

    const setR = (rParam) => {
        RVal = rParam;
        RadiusStore.getState().radius = RVal;
        console.log(RVal);
    }

    const YRef = useRef(null);

    // Добавить точку в базу данных, загрузить точки из бд, обновить селектор
    function add() {
        YVal = YRef.current.value;
        console.log(YVal);

        addPoint();
        loadEntries();
    }

    // Почистить таблицу сначала в базе данных и затем в store
    function clearTable() {
        clearPoints();
        dispatch(clear())
    }

    return (
        <div>
            <div>
                <b>
                    Username: {UserStore.getState().username} <br/>
                    Password: {UserStore.getState().password}
                </b>
            </div>

            <div className="custom">
                <label htmlFor="x_coords">
                    <b>X : </b>
                </label>
                <button name="x" id="X1" value="-5" onClick={() => setX(-5)}>-5</button>
                <button name="x" id="X2" value="-4" onClick={() => setX(-4)}>-4</button>
                <button name="x" id="X3" value="-3" onClick={() => setX(-3)}>-3</button>
                <button name="x" id="X4" value="-2" onClick={() => setX(-2)}>-2</button>
                <button name="x" id="X5" value="-1" onClick={() => setX(-1)}>-1</button>
                <button name="x" id="X6" value="0"  onClick={() => setX(0)}>0</button>
                <button name="x" id="X7" value="1"  onClick={() => setX(1)}>1</button>
                <button name="x" id="X8" value="2"  onClick={() => setX(2)}>2</button>
                <button name="x" id="X9" value="3"  onClick={() => setX(3)}>3</button>
            </div>

            <div>
                <b>Y : </b>
                <input type="text" name="y" maxLength="5" id="Y" placeholder="от -3 до 3" defaultValue="" 
                    required={true}
                    immediate="true"
                    ref = {YRef}>
                </input>
            </div>

            <div className="custom">
                <label htmlFor="r_coords">
                    <b>R : </b>
                </label>
                <button name="x" id="X1" value="-5" onClick={() => setR(-5)}>-5</button>
                <button name="x" id="X2" value="-4" onClick={() => setR(-4)}>-4</button>
                <button name="x" id="X3" value="-3" onClick={() => setR(-3)}>-3</button>
                <button name="x" id="X4" value="-2" onClick={() => setR(-2)}>-2</button>
                <button name="x" id="X5" value="-1" onClick={() => setR(-1)}>-1</button>
                <button name="x" id="X6" value="0"  onClick={() => setR(0)} >0</button>
                <button name="x" id="X7" value="1"  onClick={() => setR(1)} >1</button>
                <button name="x" id="X8" value="2"  onClick={() => setR(2)} >2</button>
                <button name="x" id="X9" value="3"  onClick={() => setR(3)} >3</button>
            </div>

            <div>
                <button id="submit-button" type="submit" value="Проверка правильности" className="button" onClick={add} >Проверка правильности</button>
            </div>

            <div>
                <button id="submit-button" type="submit" value="Очистить таблицу" className="button" onClick={clearTable}>Очистить таблицу</button>
            </div>

            <div>
                <button id="submit-button" type="submit" value="Выйти" className="button" onClick={exit}>Выход</button>
            </div>
        </div>
    );
}

export default InputPanel;