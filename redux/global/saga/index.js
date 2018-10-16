import { call, put, takeLatest } from 'redux-saga/effects';
import { globalDataFailure, setPageData } from '../actions';
import { INVOKE_PAGE_SERVICE } from '../constants';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { PAGE_SERVICE_DOMAIN }
} = getConfig();

/**
 * Saga to invoke page service corresponding to the route in the application
 *
 * @param {object} action
 */
export function* pageSaga(action) {
  const { page } = action.data;
  try {
    const data = yield call(async () => {
      const response = await fetch(
        `${PAGE_SERVICE_DOMAIN}/page-service/${page || 'home'}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
      return await response.json();
    });

    yield put(setPageData(data));
  } catch (err) {
    yield put(globalDataFailure(err));
  }
}

export default function* globalSaga() {
  try {
    yield takeLatest(INVOKE_PAGE_SERVICE, pageSaga);
  } catch (err) {
    yield put(globalDataFailure(err));
  }
}
