import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { rootCounter } from "./reducer/Index";
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['counter']
}

const persistedReducer = persistReducer(persistConfig, rootCounter)

export const conFigure = () => {
    let store = createStore(rootCounter, applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor};
}