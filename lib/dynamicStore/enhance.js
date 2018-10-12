/**
 * Enhance is a one of the crucial utility methods that this framework provides.
 * All page level component need to be wrapped within this method.
 *
 * - "enhance" function is used here which creates a High Order Component over the provided
 * page level component and connects itself to a Redux store.
 * - It internally has the definition of the "getInitialProps" function which will synchronously
 * be called by Next.js which has access to store and request objects from server.
 * - The High Order Component which injects the global reducer and saga (if any) that are
 * associated with that page level component in its "getInitialProps" lifecycle hook.
 * - It also then waits for the page level sagas to yield. We have a "monitorSagas"
 * function which will wait till the done property of all running sagas are resolved/rejected.
 * - "enhance" function basically creates a High Order Component and connects it to the redux store
 * taking in "mapStateToProps" and "mapDispatchToProps".
 *
 * Details: [docs/PageLevelComponents_Enhance.md]
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { fromJS } from 'immutable';
import Router from 'next/router';

import initRedux from './configureStore';
import monitorSagas from './monitorSagas';
import loggerFactory from '../../utils/logger';
import { DESKTOP, MOBILE, PHONE, API_ERROR_HANDLER_PAGE, TABLET, DEFAULT_BRAND } from '../../constants';
import globalActions, {
  serverActions,
  setAuthentication,
  checkAuthentication,
  setUserState,
  pageActions,
} from '../../global/actions';

import {
  CONFIG_KEYS,
  USER_STATE_LOGGED_IN,
  USER_STATE_RECOGNIZED,
  USER_STATE_ANONYMOUS,
} from '../../global/constants';
import { globalDataStructure } from '../../global/reducer';
import injectSagaAndReducer from './injectSagaAndReducer';
import { parseQueryParams } from '../../utils/utils';

const cache = require('memory-cache');

const logger = loggerFactory.getLogger();

// List of headers to be extracted before forwarding to the respective
// endpoints from the application
const headerExclusionList = [
  'host',
  'accept',
  'content-length',
  'content-type',
  'connection',
  'cookie',
];

/**
 * Method to remove the headers present in the "headerExclusionList"
 *
 * @param {Object} requestHeaders Headers object received from the request
 */
const cleanupRequestHeaders = (requestHeaders) => {
  if (!requestHeaders) {
    return null;
  }
  const requestHeadersCopy = Object.assign({}, requestHeaders);
  headerExclusionList.forEach((header) => {
    delete requestHeadersCopy[header];
  });

  // Alternative header for user agent
  requestHeadersCopy['x-ua-browser'] = requestHeaders['user-agent'];
  return requestHeadersCopy;
};

export const getWrapperComponent = (
  WrappedComponent,
  {
    key, reducer, saga, initialActions, useQuery, criticalState, preExecuteGetInitialProps,
  },
) =>
  class WrapperComponent extends Component {
    /**
     * Method to add the request details to the action object
     *
     * @param {Object} action Action object
     * @param {Object} requestDetails Request object of incoming request
     */
    static addRequestDetails(action, requestDetails) {
      return { ...action, requestDetails };
    }

    /**
     * Method to validate if critical data required for the page is present based on which
     * page is rendered or user redirected to an error page
     *
     * @param {Object} storeStruct Structure of the critical data required for page
     * @param {Object} res Response object from incoming request for necessary redirects etc.
     * @param {Object} store Redux store of the application
     * @param {boolean} isServer Flag to indicate server/client
     */
    static validatePageData(storeStruct, res, store, isServer) {
      if (storeStruct && storeStruct.length > 0) {
        const currentState = store.getState();
        const missingDataList = [];

        [...storeStruct, ...globalDataStructure].forEach((requiredDataPath) => {
          try {
            if (!currentState.getIn(requiredDataPath)) {
              missingDataList.push(requiredDataPath);
            }
          } catch (e) {
            missingDataList.push(requiredDataPath);
          }
        });

        if (missingDataList.length > 0) {
          logger.error(
            `${WrapperComponent.displayName} - Component failed to recieve critical data`,
            JSON.stringify(missingDataList),
          );
          if (isServer) {
            res.redirect(API_ERROR_HANDLER_PAGE);
          } else {
            Router.push(API_ERROR_HANDLER_PAGE);
          }
        }
      }
    }

    /**
     * Method to dispatch all page level actions provided to the "enhance" method
     *
     * @param {Array} param.actions Array of action objects at page level
     * @param {Object} param.store Redux store object
     * @param {boolean} param.needQuery Flag to indicate if the actions need the query params
     * @param {Object} param.query Query params of the incoming request
     * @param {Object} param.requestDetails Object containing details of incoming request
     */
    static dispatchActions({
      actions, store, needQuery, query, requestDetails,
    }) {
      actions.map(action =>
        store.dispatch(typeof action === 'function'
          ? WrapperComponent.addRequestDetails(
            action(needQuery ? query : undefined),
            requestDetails,
          )
          : WrapperComponent.addRequestDetails(
            { type: action, query: needQuery ? query : undefined },
            requestDetails,
          )));
    }

    static async checkUserState({
      isServer, req, requestDetails, store,
    }) {
      let email;
      let recognizedUserId;

      if (isServer) {
        const { sessionInfo } = req;
        store.dispatch(setAuthentication(sessionInfo));
        ({ email } = sessionInfo);
        ({ recognizedUserId } = sessionInfo);

        if (email) {
          store.dispatch(setUserState(USER_STATE_LOGGED_IN));
        } else if (recognizedUserId) {
          store.dispatch(setUserState(USER_STATE_RECOGNIZED));
        } else {
          store.dispatch(setUserState(USER_STATE_ANONYMOUS));
        }
      } else {
        WrapperComponent.dispatchActions({ actions: [checkAuthentication], requestDetails, store });

        await monitorSagas(store, isServer, false);
      }
    }

    static async getInitialProps(...params) {
      const initialParams = params[0];

      const {
        store, isServer, req, query, res, pathname, asPath,
      } = initialParams;

      injectSagaAndReducer(key, store, saga, reducer);
      store.dispatch(serverActions.setCurrentRoute(pathname));
      let requestDetails;
      let clientParams = {};

      if (isServer) {
        const deviceType = req.device.type === PHONE ? MOBILE : DESKTOP;
        const isTablet = req.device.type === TABLET;
        store.dispatch(serverActions.addIsTablet(isTablet));
        store.dispatch(serverActions.addDeviceType(deviceType));
        store.dispatch(serverActions.addActiveBrand(process.env.ACTIVE_BRAND || DEFAULT_BRAND));
        store.dispatch(serverActions.setPageUrl(req.url));
        store.dispatch(serverActions.setPageQuery({ ...req.query, ...query }));
        store.dispatch(serverActions.setPageOrigin(`${req.protocol}://${req.headers.host}`));

        if (req.cookies && req.cookies.pdpCrumb) {
          store.dispatch(serverActions.setPDPCrumb(JSON.parse(req.cookies.pdpCrumb)));
        }

        requestDetails = {
          deviceType,
          cookies: req.cookies.cookieList,
          logger: req.perfLogger,
          whitelistedHeaders: cleanupRequestHeaders(req.headers),
        };
        store.dispatch({ configKeys: fromJS(cache.get('configKeys')), type: CONFIG_KEYS });
      } else {
        clientParams = parseQueryParams(asPath);
        store.dispatch(serverActions.setPageQuery(clientParams));
        requestDetails = {
          deviceType: store.getState().getIn(['global', 'globalData', 'deviceType']),
        };
      }

      WrapperComponent.checkUserState({
        isServer,
        req,
        requestDetails,
        store,
      });

      if (preExecuteGetInitialProps && WrappedComponent.getInitialProps) {
        await WrappedComponent.getInitialProps(...params);
      }

      if (isServer && globalActions instanceof Array) {
        WrapperComponent.dispatchActions({
          actions: globalActions,
          store,
          needQuery: useQuery,
          query,
          requestDetails,
        });
      }

      const combinedPageActions =
        initialActions instanceof Array ? [...pageActions, ...initialActions] : [...pageActions];

      WrapperComponent.dispatchActions({
        actions: combinedPageActions,
        store,
        needQuery: useQuery,
        query: { ...query, ...clientParams },
        requestDetails,
      });

      // Wait till all sagas are done
      await monitorSagas(store, isServer);

      WrapperComponent.validatePageData(criticalState, res, store, isServer);

      if (!preExecuteGetInitialProps && WrappedComponent.getInitialProps) {
        await WrappedComponent.getInitialProps(...params);
      }

      return {
        isServer,
      };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

/**
 * Create a high order component to initialize store with reducers and sagas
 * for the page level component
 *
 * @param {Object} WrappedComponent Page level component to be wrapped with HOC
 * @param {Object} config Configuration
 * @param {function} config.mapStateToProps Map properties from state to props
 * @param {function} config.mapDispatchToProps Map dispatch method for the component
 * @param {string} config.key Unique key identifying the page level component and
 * hence its saga and reducer
 * @param {Objext} config.reducer Root reducer for the given page level component
 * @param {Objext} config.saga Root saga for the given page level component
 */
export default (
  WrappedComponent,
  {
    mapStateToProps,
    mapDispatchToProps,
    key,
    reducer,
    saga,
    initialActions,
    useQuery,
    criticalState,
  },
) => {
  const WrapperComponent = getWrapperComponent(WrappedComponent, {
    key,
    reducer,
    saga,
    initialActions,
    useQuery,
    criticalState,
  });

  // Move all non react specific static properties from WrappedComponent to WrapperComponent
  hoistNonReactStatic(WrapperComponent, WrappedComponent, {
    getInitialProps: true,
  });

  // Give a unique identifier to the new high horder component
  WrapperComponent.displayName = `enhanced(${WrappedComponent.displayName ||
    WrappedComponent.name ||
    'Component'})`;

  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  const withRedux = initRedux({
    key,
    reducer,
    saga,
  });

  return compose(
    withRedux,
    withConnect,
  )(WrapperComponent);
};
