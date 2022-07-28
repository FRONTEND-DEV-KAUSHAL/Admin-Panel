import * as ActionType from "../Action"
import { counterReducer } from "../Reducer/Counter.reducer"

export const increment = () => (dispatch) => {

    dispatch({ type: ActionType.INCREMENT_COUNTER })
}
export const decrement = () => (dispatch) => {

    dispatch({ type: ActionType.DECREMENT_COUNTER })
}