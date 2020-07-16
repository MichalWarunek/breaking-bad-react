import {applyMiddleware, compose, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import thunk from 'redux-thunk';
import { persistStore} from 'redux-persist';
import history from './history';


const initialState = {};
const enhancers = [];
const middleware = [thunk, routerMiddleware(history)];



if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);



export default () => {
    let store = createStore(
        connectRouter(history),
        initialState,
        composedEnhancers
    );
    let persistor = persistStore(store);
    return {store, persistor};
};
