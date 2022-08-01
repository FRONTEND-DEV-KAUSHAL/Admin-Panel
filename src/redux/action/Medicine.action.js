import { BASE_URL } from '../../shared/url';
import  * as Actiontypes from '../ActionTypes'

export const getMedicines = () => (dispatch) => {
    try {
        fetch(BASE_URL + 'medicines')
            .then((response) => response.json())
            .then((data) => dispatch({type : Actiontypes.MEDICINE_GETDATA, payload : data} ))
            .catch((error)=> console.log(error));   
        
    } catch (error) {
        console.log(error);
    }
}