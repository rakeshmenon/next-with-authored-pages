import {
  CURRENT_ROUTE,
  PAGE_URL,
  PAGE_QUERY,
  GLOBAL_DATA_FAILURE
} from '../constants';

export const globalDataFailure = error => ({
  type: GLOBAL_DATA_FAILURE,
  error
});

export const pageActions = [];

export default [];

export const serverActions = {
  setCurrentRoute: pathname => ({ type: CURRENT_ROUTE, pathname }),
  setPageUrl: pageUrl => ({ type: PAGE_URL, pageUrl }),
  setPageQuery: pageQuery => ({
    type: PAGE_QUERY,
    pageQuery
  })
};
