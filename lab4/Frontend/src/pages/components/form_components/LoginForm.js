import {useNavigate} from "react-router-dom";
import {useRef} from 'react';

import UserStore from './store/UserStore';

const LoginForm = () => {

    let navigate = useNavigate(); 

    var usernameRef = useRef(null);
    var passwordRef = useRef(null);

    function handleLoginClick() {
        //console.log(usernameRef.current.value);
        //console.log(passwordRef.current.value);
        
        //initialState.username = usernameRef.current.value;
        //initialState.password = passwordRef.current.value;
        //console.log(initialState.username);
        //console.log(initialState.password);

        UserStore.getState().username = usernameRef.current.value;
        UserStore.getState().password = passwordRef.current.value;

        let path = '../main'; 
        navigate(path);
    }

    function handleSignupClick() {
        //console.log(usernameRef.current.value);
        //console.log(passwordRef.current.value);
        
        //initialState.username = usernameRef.current.value;
        //initialState.password = passwordRef.current.value;
        //console.log(initialState.username);
        //console.log(initialState.password);

        UserStore.getState().username = usernameRef.current.value;
        UserStore.getState().password = passwordRef.current.value;
        
        let path = '../main'; 
        navigate(path);
    }

    return (
      <div className="App">

        <div>
            <button id="submit-button" type="submit" value="Выйти" className="button" onClick={handleLoginClick}>Войти</button>
        </div>

        <div>
            <button id="submit-button" type="submit" value="Выйти" className="button" onClick={handleSignupClick}>Зарегестрироваться</button>
        </div>

        <div>
            <b>Логин: </b>
            <input type="text" defaultValue="aaaaaa" 
                required={true}
                immediate="true"
                ref = {usernameRef}>
            </input>
        </div>

        <div>
            <b>Пароль: </b>
            <input type="text" defaultValue="aaaaaa" 
                required={true}
                immediate="true"
                ref = {passwordRef}>
            </input>
        </div>

      </div>
    );
}

export default LoginForm;