import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import createHistory from 'history/createMemoryHistory';
import logger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import rootReducer from '../store/reducers';

const routerReducers = routerMiddleware(createHistory());//路由
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
const middleware =  process.env.NODE_ENV === 'development' ? [thunkMiddleware, routerReducers, logger] : [thunkMiddleware, routerReducers];
let configureStore=(initialState) => createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)));

export default configureStore;
