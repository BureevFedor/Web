import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

import UserStore from './store/UserStore';
import { clear, addEntry } from './store/EntriesActions'

const Table = () => {
    const dispatch = useDispatch();

    var entries = useSelector(state => state.reducer)
    var username = UserStore.getState().username;
    var password = UserStore.getState().password;

    console.log("in table username: " + username);
    console.log("in table password: " + password)

    useEffect(()=> {
        console.log("useEffect TABLE");
        try {
            loadEntries();
        } catch {
            console.log("BEBEBABABAA");
        }
    }, []);

    async function loadEntries() {
        dispatch(clear());

        const promiseAwait = new Promise((resolve, reject) => {
            const response = axios.post('http://localhost:8080/lab4-backend-1.0-SNAPSHOT/api/entries/observe', 
                JSON.stringify(
                    { 
                        username: username,
                        password: password
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

                console.log("Вывод7 " + x);
                console.log("Вывод7 " + y);
                console.log("Вывод7 " + r);
                console.log("Вывод7 " + item.currentTime);
                console.log("Вывод7 " + item.result);

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

        console.log("tb_data (" + entries.length + " points)"); 
    }

    let tb_data = entries.map((item) => {
        return (
            <tr key={item.currentTime}>
                <td>{item.coordinateX}</td>
                <td>{item.coordinateY}</td>
                <td>{item.radius}</td>
                <td>{item.currentTime}</td>
                <td>{item.result}</td>
            </tr>
        )
    })

    return (
        <div className="container">
            <form id="tableForm">
                <table>
                    <thead>
                        <tr>
                            <th>X</th>
                            <th>Y</th>
                            <th>R</th>
                            <th>Время</th>
                            <th>Результат</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tb_data}
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default Table;