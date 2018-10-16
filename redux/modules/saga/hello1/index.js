import { call, put, all, takeLatest } from 'redux-saga/effects';
import { INVOKE_HELLO1_SERVICE } from '../../constants';

import { hello1Failure, setHello1Data } from '../../actions';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { COMPONENT_SERVICE_DOMAIN }
} = getConfig();

/**
 * Saga to invoke Hello1 service corresponding to the route in the application
 *
 * @param {object} action
 */
export function* invokeHello1ServiceSaga(action) {
  const { component } = action.data;
  try {
    const response = yield call(async () => {
      return await fetch(
        `${COMPONENT_SERVICE_DOMAIN}/component-service/${component}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
    });
    const data = yield response.json();
    yield put(setHello1Data(data));
  } catch (err) {
    yield put(hello1Failure(err));
  }
}

export default function* hello1Saga() {
  try {
    yield all([takeLatest(INVOKE_HELLO1_SERVICE, invokeHello1ServiceSaga)]);
  } catch (err) {
    yield put(failureCheckout(err));
  }
}
