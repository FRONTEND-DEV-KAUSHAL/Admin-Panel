import * as ActionType from '../Action'

const InitVal = {
    counter : 0
}

export const CounterReducer = (state = InitVal, action) => {
    switch(action.type) {
        case ActionType.INCREMENT_COUNTER:
            return {
                ...state,
                counter : state.counter + 1

            }
        case ActionType.DECREMENT_COUNTER:
            return {
                ...state,
                counter : state.counter - 1

            }
        default : 
            return state
    }
}