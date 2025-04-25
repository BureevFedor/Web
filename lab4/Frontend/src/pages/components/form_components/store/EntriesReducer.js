import { createReducer } from '@reduxjs/toolkit';
import { clear, addEntry, update } from './EntriesActions';

let initialState = []

const EntriesReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(clear, (state, action) => {
            console.log ("clear action activated");
            return initialState;
        })
        .addCase(addEntry, (state, action) => {
            console.log("add entry action activated - added " + action.payload.coordinateX);
            state.push(action.payload);
            return state;
        })
        .addCase(update, (state, action) => {
            return { ...state};
        })
})

export default EntriesReducer;