import { SET_PAGE_DATA } from '../constants';

export const initState = {};

const setPageData = (state, { data }) => {
  console.log('Page Data:');
  console.log(data);
  return Object.assign({}, state, {
    response: data
  });
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case SET_PAGE_DATA:
      return setPageData(state, action);
    default:
      return state;
  }
};
