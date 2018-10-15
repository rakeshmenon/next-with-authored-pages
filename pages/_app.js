import React from 'react';
import App, { Container } from 'next/app';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import BaseComponent from './BaseLayoutEngine';
import { Router } from '../server/routes';
import getConfig from 'next/config';

import initRedux from '../lib/dynamicStore/configureStore';
import monitorSagas from '../lib/dynamicStore/monitorSagas';

// import injectSagaAndReducer from '../lib/dynamicStore/injectSagaAndReducer';

import globalActions, { serverActions, pageActions } from '../global/actions';
import parseQueryParams from '../utils/parseQueryParams';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const { publicRuntimeConfig } = getConfig();

class EnhancedPage extends App {
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
   * Method to dispatch all page level actions
   *
   * @param {Array} param.actions Array of action objects at page level
   * @param {Object} param.store Redux store object
   * @param {boolean} param.needQuery Flag to indicate if the actions need the query params
   * @param {Object} param.query Query params of the incoming request
   * @param {Object} param.requestDetails Object containing details of incoming request
   */
  static dispatchActions({ actions, store, needQuery, query, requestDetails }) {
    actions.map(action =>
      store.dispatch(
        typeof action === 'function'
          ? EnhancedPage.addRequestDetails(
              action(needQuery ? query : undefined),
              requestDetails
            )
          : EnhancedPage.addRequestDetails(
              { type: action, query: needQuery ? query : undefined },
              requestDetails
            )
      )
    );
  }

  static async getInitialProps({ ctx, Component, Router }) {
    let pageProps = {};

    const { store, req, res, query, pathname, asPath } = ctx;
    const isServer = typeof req !== 'undefined';

    store.dispatch(serverActions.setCurrentRoute(pathname));
    let requestDetails = {
      route: asPath
    };
    let clientParams = {};

    if (isServer) {
      store.dispatch(serverActions.setPageUrl(req.url));
      store.dispatch(serverActions.setPageQuery({ ...req.query, ...query }));
    } else {
      clientParams = parseQueryParams(asPath);
      store.dispatch(serverActions.setPageQuery(clientParams));
    }

    if (isServer && Array.isArray(globalActions)) {
      EnhancedPage.dispatchActions({
        actions: globalActions,
        store,
        needQuery: true,
        query,
        requestDetails
      });
    }

    EnhancedPage.dispatchActions({
      actions: pageActions,
      store,
      needQuery: true,
      query: { ...query, ...clientParams },
      requestDetails
    });

    // Wait till all sagas are done
    await monitorSagas(store, isServer);

    if (BaseComponent.getInitialProps) {
      pageProps = await BaseComponent.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { pageProps, pageData, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <BaseComponent pageData={pageData} {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

const withConnect = connect(
  state => {
    return {
      pageData: state.global.pageData.response
    };
  },
  () => {
    return {};
  }
);
const withRedux = initRedux({
  key: 'random'
});

export default compose(
  withRedux,
  withConnect
)(EnhancedPage);
