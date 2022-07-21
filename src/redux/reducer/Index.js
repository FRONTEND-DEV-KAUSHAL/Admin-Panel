import { combineReducers } from "redux";
import { CounterReducer } from "./Counter.reducer";


export const RootReducer = combineReducers({
    counter : CounterReducer
})