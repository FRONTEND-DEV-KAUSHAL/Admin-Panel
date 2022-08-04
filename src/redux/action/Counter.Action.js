import * as ActionType from "../../../src/redux/ActionTypes"
import { counterReducer } from "../reducer/Counter.reducer"

export const increment = () => (dispatch) => {

    dispatch({ type: ActionType.INCREMENT_COUNTER })
}
export const decrement = () => (dispatch) => {

    dispatch({ type: ActionType.DECREMENT_COUNTER })
}