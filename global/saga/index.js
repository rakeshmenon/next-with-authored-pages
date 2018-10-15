import { put, all } from 'redux-saga/effects';
import { globalDataFailure } from '../actions';

export default function* globalSaga() {
  try {
    yield all([]);
  } catch (err) {
    yield put(globalDataFailure(err));
  }
}
