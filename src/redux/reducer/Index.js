import { combineReducers } from "redux"
import { counterReducer } from "./Counter.reducer"
import { MedicineReducer } from "./Medicine.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer,
    medicine: MedicineReducer
})