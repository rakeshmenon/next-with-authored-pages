import {
  CURRENT_ROUTE,
  PAGE_URL,
  PAGE_QUERY,
  SET_PAGE_DATA
} from '../constants';

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

const setPageData = (state, { data }) =>
  Object.assign({}, state, {
    pageData: data
  });

export default (state = initState, action = {}) => {
  switch (action.type) {
    case CURRENT_ROUTE:
      return setRoute(state, action);
    case PAGE_URL:
      return setPageUrl(state, action);
    case PAGE_QUERY:
      return setPageQuery(state, action);
    case SET_PAGE_DATA:
      return setPageData(state, action);
    default:
      return state;
  }
};
