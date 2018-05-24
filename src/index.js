import React from 'react';
import { hydrate, render } from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import Loadable from 'react-loadable';
import app from './app';
import newReducer from './store/reducers';

const initialState = window && window.__INITIAL_STATE__;
const history = createHistory();
const { configureStore, createApp } = app;
const store = configureStore(initialState);

const renderApp = () => {
  const application = createApp({ store, history });
  const renderMethed = process.env.NODE_ENV === 'development' && module.hot ? render : hydrate;
  renderMethed(application, document.getElementById('root'));
}
console.log(2222)
window.main = () => {
  Loadable.preloadReady().then(() => {
    renderApp();
  });
};

if(process.env.NODE_ENV === 'development'){
  if(module.hot) {
    module.hot.accept(newReducer, () => {
      store.replaceReducer(newReducer)
    })
    module.hot.accept(createApp, () => {
      store.replaceReducer(newReducer);
      const application = createApp({ store, history });
      hydrate(application, document.getElementById('root'));
    })
  }
}