import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';

export const Configurestore = () => {
    let store = createStore(RootReducer , applyMiddleware(thunk))

    return store;
}
