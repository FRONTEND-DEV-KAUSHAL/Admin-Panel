
import * as Actiontypes from '../ActionTypes'

const initVal = {
    isLoading: false,
    patients: [],
    error: ''

}

export const patientsReducer = (state = initVal, action) => {
    console.log(action.type, action.payload);
    switch (action.type) {
        case Actiontypes.PATIENTS_GETDATA:
            return {
                ...state,
                isLoading: false,
                patients: action.payload,
                error: ''
            }
        case Actiontypes.LOADING_PATIENTS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }
        case Actiontypes.ERROR_PATIENTS:
            return {
                ...state,
                isLoading: false,
                patients: [],
                error: action.payload
            }
        case Actiontypes.PATIENTS_ADDDATA:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.concat(action.payload),
                error: ''
            }
        case Actiontypes.PATIENTS_DELETE:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.filter((p) => p.id !== action.payload),
                error: ''
            }
        case Actiontypes.PATIENTS_UPDATE:
            return {
                ...state,
                isLoading: false,
                patients: state.patients.map((p) => {
                    if (p.id === action.payload.id) {
                        return action.payload
                    }
                    else {
                        return p
                    }
                }),
                error: ''
            }
        default:
            return state;
    }
}