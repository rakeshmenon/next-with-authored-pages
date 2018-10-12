import each from 'lodash/each';
import { END } from 'redux-saga';
import getSagaInjectors from './sagaInjectors';

/**
 * @function monitorSagas - Wait till all sagas have been done
 * @param {Object} store
 * @returns {Promise}
 */
export default function monitorSagas(store, isServer, shouldDispatchEnd = true) {
  const allTasks = [store.globalSaga.task];
  if (shouldDispatchEnd) store.dispatch(END);
  each(store.injectedSagas, (saga) => {
    allTasks.push(saga.task);
  });
  return Promise.all(allTasks.map(t => t.done)).then(() => {
    if (!isServer && shouldDispatchEnd) {
      const { injectSaga } = getSagaInjectors(store);
      each(store.injectedSagas, (descriptor, key) => {
        const { saga } = descriptor;
        injectSaga(key, { saga });
      });
      store.runSaga(store.globalSaga.globalSaga);
    }
  });
}
