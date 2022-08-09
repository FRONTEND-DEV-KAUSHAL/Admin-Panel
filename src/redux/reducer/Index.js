import { combineReducers } from "redux"
import { counterReducer } from "../reducer/Counter.reducer"
import { DoctoresReducer } from "../reducer/Doctor.reducer"
import { MedicineReducer } from "../reducer/Medicines.reducer"
import { patientsReducer } from "../reducer/Patients.reducer"

export const rootCounter = combineReducers({
    counter: counterReducer,
    medicine: MedicineReducer,
    patients : patientsReducer,
    doctors : DoctoresReducer,
})