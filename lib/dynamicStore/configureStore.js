import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import nextReduxWrapper from 'next-redux-wrapper';

import createReducer from './reducers';
import globalSaga from '../../global/saga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const enhancers = [applyMiddleware(...middlewares)];

// Choose compose method depending upon environment and platform
const composeEnhancers =
  process.env.NODE_ENV !== 'production' && typeof window === 'object'
    ? composeWithDevTools
    : compose;

/**
 * Create redux store with the middlewares and enhancers
 *
 * @param {Object} options
 * @param {Object} options.key - Unique key to recognize the page component
 * @param {Object} options.reducer - Reducers associated with the page commponent
 * @param {Object} options.saga - Sagas associated with the page commponent
 */
export default options => (BaseComponent) => {
  const hasKey = !!options.key;
  if (!hasKey) throw new Error(`${BaseComponent.displayName} needs to be passed with a key`);
  const hasReducer = !!options.reducer;
  const hasSaga = !!options.saga;
  const reducer = hasKey && hasReducer ? { [options.key]: options.reducer } : {};

  const configureStore = (initialState = {}) => {
    const store = createStore(
      createReducer(reducer),
      fromJS(initialState),
      composeEnhancers(...enhancers),
    );

    // Keep access to 'run' method of saga task in store so thats its available globally with store
    store.runSaga = sagaMiddleware.run;
    // Keep record of reducer injected in store associated with unique key
    store.injectedReducers = reducer;
    if (globalSaga) {
      // Run global saga and keep the task returned by running saga to access later while cancelling
      store.globalSaga = { globalSaga, task: store.runSaga(globalSaga) };
    }
    // Keep record of saga injected in store associated with unique key
    store.injectedSagas = {};
    if (hasSaga) {
      // Run saga and keep the task returned by running saga to access later while cancelling
      store.injectedSagas[options.key] = { ...options.saga, task: store.runSaga(options.saga) };
    }
    return store;
  };

  return nextReduxWrapper(configureStore)(BaseComponent);
};
