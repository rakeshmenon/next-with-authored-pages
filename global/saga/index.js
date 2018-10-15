import { call, put, all, takeLatest } from 'redux-saga/effects';
import { globalDataFailure, setPageData } from '../actions';
import { INVOKE_PAGE_SERVICE } from '../constants';

export function* pageSaga(action) {
  const { route } = action.requestDetails;
  try {
    const response = yield call(async () => {
      return await fetch(
        `http://localhost:5000/page-service${route === '/' ? '/home' : route}`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      );
    });
    const data = yield response.json();
    yield put(setPageData(data));
  } catch (err) {
    yield put(globalDataFailure(err));
  }
}

export default function* globalSaga() {
  try {
    yield all([takeLatest(INVOKE_PAGE_SERVICE, pageSaga)]);
  } catch (err) {
    yield put(globalDataFailure(err));
  }
}
