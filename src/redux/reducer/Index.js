import { combineReducers } from "redux"
import { counterReducer } from "../reducer/Counter.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer
})