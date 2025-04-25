import { configureStore } from '@reduxjs/toolkit';
import EntriesReducer from './EntriesReducer';

const EntriesStore = configureStore({
    reducer: {reducer: EntriesReducer}
});

export default EntriesStore;