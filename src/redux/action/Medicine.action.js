import { BASE_URL } from '../../shared/url';
import * as Actiontypes from "../../../src/redux/ActionTypes"

export const getMedicines = () => (dispatch) => {
    try {
        dispatch(loadingMedicines())

        setTimeout(function () {
            fetch(BASE_URL + 'medicines')
                .then(response => {
                    if (response.ok) {
                        return response;
                    } else {
                        var error = new Error('Error ' + response.status + ': ' + response.statusText);
                        error.response = response;
                        throw error;
                    }
                },
                    error => {
                        var errmess = new Error(error.message);
                        throw errmess;
                    })
                .then((response) => response.json())
                .then((data) => dispatch({ type: Actiontypes.MEDICINE_GETDATA, payload: data }))
                .catch((error) => dispatch(errorMedicines(error.message)));
        }, 2000)

    } catch (error) {
        dispatch(errorMedicines(error.message))

    }
}

export const addMedicines = (data) => (dispatch) => {
    try {
        fetch(BASE_URL + 'medicines', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
            .then((response) => response.json())
            .then((data) => {
                dispatch({ type: Actiontypes.MEDICINE_ADDDATA, payload: data });
            })
            .catch((error) => {
                dispatch(errorMedicines(error.message));
            });
    } catch (error) {
        dispatch(errorMedicines(error.message))
    }
}

export const loadingMedicines = () => (dispatch) => {
    dispatch({ type: Actiontypes.LOADING_MEDICINES })
}

export const errorMedicines = (error) => (dispatch) => {
    dispatch({ type: Actiontypes.ERROR_MEDICINES, payload: error })
}