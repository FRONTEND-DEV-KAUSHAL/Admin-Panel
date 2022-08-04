import { createStore , applyMiddleware } from "redux";
import { rootCounter } from "../redux/reducer/Index";
import thunk from 'redux-thunk'

export const conFigure = () => {
    let store = createStore(rootCounter ,  applyMiddleware(thunk))
    return store;
}