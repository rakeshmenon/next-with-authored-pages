import { CURRENT_ROUTE, PAGE_URL, PAGE_QUERY } from '../constants';

export const initState = {};

const setPageUrl = (state, { pageUrl }) =>
  Object.assign({}, state, {
    pageUrl
  });

const setRoute = (state, { pathname }) =>
  Object.assign({}, state, {
    route: pathname
  });

const setPageQuery = (state, { pageQuery }) =>
  Object.assign({}, state, {
    pageQuery
  });

export default (state = initState, action = {}) => {
  switch (action.type) {
    case CURRENT_ROUTE:
      return setRoute(state, action);
    case PAGE_URL:
      return setPageUrl(state, action);
    case PAGE_QUERY:
      return setPageQuery(state, action);
    default:
      return state;
  }
};
