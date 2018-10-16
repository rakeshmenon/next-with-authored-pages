import { SET_HELLO1_DATA } from '../../constants';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_HELLO1_DATA:
      return Object.assign({}, state, {
        data: action.data
      });
    default:
      return state;
  }
};
