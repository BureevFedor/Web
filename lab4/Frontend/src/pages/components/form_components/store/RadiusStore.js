import { createStore } from 'redux';

let initialState = {
    radius: 2
}

const reducer = (state = initialState, action) => {
    return state;
}

let RadiusStore = createStore(reducer);

export default RadiusStore;