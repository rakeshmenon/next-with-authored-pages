import {
  CURRENT_ROUTE,
  PAGE_URL,
  PAGE_QUERY,
  GLOBAL_DATA_FAILURE,
  PAGE_ORIGIN
} from '../constants';

export const globalDataFailure = (error: Error) => ({
  type: GLOBAL_DATA_FAILURE,
  error
});

export const pageActions = [];

export default [];

export const serverActions = {
  setCurrentRoute: (pathname: string) => ({ type: CURRENT_ROUTE, pathname }),
  setPageUrl: (pageUrl: string) => ({ type: PAGE_URL, pageUrl }),
  setPageQuery: (pageQuery: { [string]: Array<string> }) => ({
    type: PAGE_QUERY,
    pageQuery
  }),
  setPageOrigin: (origin: string) => ({ type: PAGE_ORIGIN, origin })
};
