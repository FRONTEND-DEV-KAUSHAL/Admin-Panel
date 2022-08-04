import { combineReducers } from "redux"
import { counterReducer } from "../reducer/Counter.reducer"
import { DoctoresReducer } from "./Doctor.reducer"
import { MedicineReducer } from "./Medicines.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer,
    medicine: MedicineReducer,
    doctor: DoctoresReducer
})