import { createStore } from 'redux';

let initialState = {
    username: '',
    password: ''
}

const reducer = (state = initialState, action) => {
    return state;
}

let UserStore = createStore(reducer);

export default UserStore;