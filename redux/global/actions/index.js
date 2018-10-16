import {
  CURRENT_ROUTE,
  PAGE_URL,
  PAGE_QUERY,
  INVOKE_PAGE_SERVICE,
  SET_PAGE_DATA,
  GLOBAL_DATA_FAILURE
} from '../constants';

export const globalDataFailure = error => ({
  type: GLOBAL_DATA_FAILURE,
  error
});

export const invokePageService = data => {
  return {
    type: INVOKE_PAGE_SERVICE,
    data
  };
};

export const setPageData = data => ({
  type: SET_PAGE_DATA,
  data
});

export const pageActions = [invokePageService];

export default [];

export const serverActions = {
  setCurrentRoute: pathname => ({ type: CURRENT_ROUTE, pathname }),
  setPageUrl: pageUrl => ({ type: PAGE_URL, pageUrl }),
  setPageQuery: pageQuery => ({
    type: PAGE_QUERY,
    pageQuery
  })
};
