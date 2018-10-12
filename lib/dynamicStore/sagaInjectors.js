import isEmpty from 'lodash/isEmpty';
import isFunction from 'lodash/isFunction';
import isString from 'lodash/isString';
import invariant from 'invariant';
import conformsTo from 'lodash/conformsTo';

import checkStore from './checkStore';
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants';

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

/**
 * Check if key is empty
 * @param {string} key
 */
const checkKey = key =>
  invariant(
    isString(key) && !isEmpty(key),
    'sagaInjector.js : Expected `key` to be a non empty string',
  );

/**
 * Check if the saga is a function and the mode for that saga is the ones from allowedModes
 * @param {Object} descriptor
 * @param {function} descriptor.saga - The saga to be verified
 * @param {string} descriptor.mode - The mode passed for the given saga
 */
const checkDescriptor = (descriptor) => {
  const shape = {
    saga: isFunction,
    mode: mode => isString(mode) && allowedModes.indexOf(mode) > -1,
  };
  invariant(conformsTo(descriptor, shape), 'sagaInjector.js : Expected a valid saga descriptor');
};

/**
 * @function injectSagaFactory
 * @param {Object} store
 * @param {boolean} isValid - Prechecked if store is valid
 * @returns {function}
 */
export function injectSagaFactory(store, isValid) {
  /**
   * @function injectSaga
   * @param {string} key - Unique key saga
   * @param {Object} descriptor
   * @param {Object} descriptor.saga
   * @param {string} descriptor.mode
   * @param {Object} args
   */
  function injectSaga(key, descriptor = {}, args) {
    if (!isValid) checkStore(store);

    // if mode is not present then default is RESTART_ON_REMOUNT
    const newDescriptor = { ...descriptor, mode: descriptor.mode || RESTART_ON_REMOUNT };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Object.prototype.hasOwnProperty.call(store.injectedSagas, key);

    // When the environment is development then we need to cancel daemon and once-till-unmount sagas
    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (!hasSaga || (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)) {
      // eslint-disable-next-line no-param-reassign
      store.injectedSagas[key] = { ...newDescriptor, task: store.runSaga(saga, args) };
    }
  }
  return injectSaga;
}

/**
 * @function ejectSagaFactory
 * @param {Object} store
 * @param {boolean} isValid - Prechecked if store is valid
 * @returns {function}
 */
export function ejectSagaFactory(store, isValid) {
  /**
   * @function ejectSaga
   * @param {string} key - Unique key saga
   */
  function ejectSaga(key) {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Object.prototype.hasOwnProperty.call(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      // We do not cancel Daemon tasks
      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === 'production') {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = 'done'; // eslint-disable-line no-param-reassign
        }
      }
    }
  }
  return ejectSaga;
}

/**
 * @typedef {Object} SagaInjectors
 * @property {function} injectSaga
 * @property {function} ejectSaga
 */

/**
 * @function getInjectors
 * @param {Object} store
 * @returns {SagaInjectors}
 */
export default function getInjectors(store) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
