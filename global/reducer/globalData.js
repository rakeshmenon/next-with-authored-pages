import { CURRENT_ROUTE, PAGE_URL, PAGE_QUERY, PAGE_ORIGIN } from '../constants';

export const initState = {};

const setPageUrl = (state, { pageUrl }) => {
  ...state,
  pageUrl
};

const setRoute = (state, { pathname }) => {
  ...state,
  route: pathname
};

const setPageQuery = (state, { pageQuery }) => {
  ...state,
  pageQuery
};

const setPageOrigin = (state, { origin }) => {
  ...state,
  pageOrigin: origin
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case CURRENT_ROUTE:
      return setRoute(state, action);
    case PAGE_URL:
      return setPageUrl(state, action);
    case PAGE_QUERY:
      return setPageQuery(state, action);
    case PAGE_ORIGIN:
      return setPageOrigin(state, action);
    default:
      return state;
  }
};
