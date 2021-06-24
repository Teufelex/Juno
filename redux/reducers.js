import { combineReducers } from 'redux';

import countersReducer from "./counterReducer";

let combinedReducer=combineReducers({
    counters: countersReducer, 
});

export default combinedReducer;
