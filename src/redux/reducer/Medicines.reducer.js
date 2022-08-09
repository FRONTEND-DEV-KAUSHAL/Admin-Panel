import * as Actiontypes from '../ActionTypes'

const initval = {
    isLoading: false,
    medicine: [],
    error: ''
}

export const MedicineReducer = (state = initval, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case Actiontypes.MEDICINE_GETDATA:
            return {
                ...state,
                isLoading: false,
                medicine: action.payload,
                error: ''
            }
        case Actiontypes.LOADING_MEDICINES:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case Actiontypes.ERROR_MEDICINES:
            return {
                ...state,
                isLoading: false,
                medicine: [],
                error: action.payload
            }
        case Actiontypes.MEDICINE_ADDDATA:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.concat(action.payload),
                error: ''
            }
        case Actiontypes.MEDICINE_DELETE:
            return {
                ...state,
                isLoading: false,
                medicine: state.medicine.filter((m) => m.id !== action.payload),
                error: ''
            }
        default:
            return state;
    }
}