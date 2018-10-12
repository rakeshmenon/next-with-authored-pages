import invariant from 'invariant';
import isString from 'lodash/isString';
import each from 'lodash/each';
import getSagaInjectors from './sagaInjectors';
import getReducerInjectors from './reducerInjectors';

export default (key, store, saga, reducer) => {
  invariant(
    isString(key),
    `injectSagaAndReducer.js: Expected "key" to be a string, found it to be ${typeof key}`,
  );

  const { injectReducer } = getReducerInjectors(store);
  const { injectSaga, ejectSaga } = getSagaInjectors(store);

  each(store.injectedSagas, (sagas, sagaName) => {
    ejectSaga(sagaName);
    // eslint-disable-next-line no-param-reassign
    delete store.injectedSagas[sagaName];
  });

  if (reducer) injectReducer(key, reducer);
  if (saga) injectSaga(key, { saga });
};
