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
            
        default:
            return state;
    }
}