import {
  INVOKE_HELLO1_SERVICE,
  SET_HELLO1_DATA,
  HELLO1_FAILURE
} from '../constants';

export const hello1Failure = error => ({
  type: HELLO1_FAILURE,
  error
});

export const invokeHello1Service = () => ({
  type: INVOKE_HELLO1_SERVICE,
  data: {
    component: 'hello1'
  }
});

export const setHello1Data = data => ({
  type: SET_HELLO1_DATA,
  data
});
