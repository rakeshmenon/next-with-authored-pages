import hello1Reducer from './reducer/hello1';
import hello1Saga from './saga/hello1';
import { invokeHello1Service } from './actions';

export const reducers = {
  hello1Container: hello1Reducer
};

export const sagas = {
  hello1Container: hello1Saga
};

export const actions = {
  hello1Container: [invokeHello1Service]
};
