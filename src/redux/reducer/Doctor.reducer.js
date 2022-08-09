
import * as ActionTypes from '../ActionTypes'

const initval = {
    isLoading: false,
    doctors: [],
    error: ''
}

export const DoctoresReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionTypes.DOCTORS_GETDATA:
            return {
                ...state,
                isLoading: false,
                doctors: action.payload,
                error: ''
            }
        case ActionTypes.ERROR_DOCTORS:
            return {
                ...state,
                isLoading: false,
                doctors: [],
                error: action.payload
            }
        case ActionTypes.DOCTORS_ADDDATA:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.concat(action.payload),
                error: ''
            }
        case ActionTypes.DOCTORS_DELETE:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.filter((d)=> d.id !== action.payload),
                error: ''
            }
        case ActionTypes.DOCTORS_UPDATE:
            return {
                ...state,
                isLoading: false,
                doctors: state.doctors.map((d)=>{
                    if(d.id === action.payload.id){
                        return action.payload
                    }else{
                        return d
                    }
                }),
                error: ''
            }
        case ActionTypes.LOADING_DOCTORS:
            return {
                ...state,
                isLoading: true,
                error: ''
            }

        default:
            return state;
    }

}