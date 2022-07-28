import * as Action from "../Action"

const initval = {
    counter: 0
}

export const counterReducer = (state = initval, action) => {
    switch (action.type) {
        case Action.INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case Action.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state

    }
}