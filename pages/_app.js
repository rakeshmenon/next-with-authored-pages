import React from 'react';
import App, { Container } from 'next/app';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import getConfig from 'next/config';
import { combineReducers } from 'redux';

import BaseComponent from './BaseLayoutEngine';
import { Router } from '../server/routes';
import initRedux from '../lib/dynamicStore/configureStore';
import monitorSagas from '../lib/dynamicStore/monitorSagas';
import injectSagaAndReducer from '../lib/dynamicStore/injectSagaAndReducer';

import globalActions, {
  serverActions,
  pageActions
} from '../redux/global/actions';
import parseQueryParams from '../utils/parseQueryParams';
import {
  reducers as componentReducers,
  sagas as componentSagas,
  actions as componentActions
} from '../redux/modules';
import { all as sagaAll, call as sagaCall } from 'redux-saga/effects';

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
   * @param {Object} param.query Query params of the incoming request
   * @param {Object} param.requestDetails Object containing details of incoming request
   */
  static dispatchActions({ actions, store, query, requestDetails, type }) {
    actions.map(action =>
      store.dispatch(
        typeof action === 'function'
          ? EnhancedPage.addRequestDetails(action(query), requestDetails)
          : EnhancedPage.addRequestDetails(
              { type: action, query },
              requestDetails
            )
      )
    );
  }

  static getPageComponents(store) {
    const {
      global: {
        pageData: { response: pageData }
      }
    } = store.getState();
    const sections = pageData.layout.sections;

    const components = sections.reduce((accumulator, curValue) => {
      return accumulator.concat(
        curValue.components.reduce(
          (accumulator, curValue) => accumulator.concat(curValue),
          []
        )
      );
    }, []);

    console.log(pageData.pageId);

    return {
      key: pageData.pageId,
      components
    };
  }

  static getReducersAndSagas(components) {
    const reducers = components.reduce((acc, cur) => {
      if (componentReducers[cur]) {
        acc[cur] = componentReducers[cur];
        return acc;
      } else return acc;
    }, {});

    const executableSagas = [];
    let componentTriggerableActions = [];
    components.forEach(component => {
      const componentSaga = componentSagas[component];
      if (componentSaga) {
        executableSagas.push(componentSaga);
      }
      const componentAction = componentActions[component];
      if (componentAction) {
        componentTriggerableActions = [
          ...componentTriggerableActions,
          ...componentAction
        ];
      }
    });

    const sagas = function*() {
      try {
        yield sagaAll(executableSagas.map(saga => sagaCall(saga)));
      } catch (err) {
        console.log('Error executing component sagas!' + err);
      }
    };

    return {
      reducers: Object.keys(reducers).length ? combineReducers(reducers) : null,
      sagas,
      actions: componentTriggerableActions
    };
  }

  static async getInitialProps({ ctx, Component, Router }) {
    let pageProps = {};

    const { store, req, res, query, pathname, asPath } = ctx;
    const isServer = typeof req !== 'undefined';

    store.dispatch(serverActions.setCurrentRoute(pathname));
    let requestDetails = {};
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
        query,
        requestDetails,
        type: 'global'
      });
    }

    EnhancedPage.dispatchActions({
      actions: pageActions,
      store,
      query: { ...query, ...clientParams },
      requestDetails,
      type: 'page'
    });

    // Wait till all global/page sagas are done
    await monitorSagas(store, isServer);

    const { key, components } = EnhancedPage.getPageComponents(store);
    const {
      reducers: cReducers,
      sagas: cSagas,
      actions: cActions
    } = EnhancedPage.getReducersAndSagas(components);

    injectSagaAndReducer(key, store, cSagas, cReducers);

    EnhancedPage.dispatchActions({
      actions: cActions,
      store,
      query: { ...query, ...clientParams },
      requestDetails,
      type: 'component'
    });

    // Wait till all module sagas are done
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

const withConnect = connect(state => {
  return {
    pageData: state.global.pageData.response
  };
});

const withRedux = initRedux({
  key: 'base-component'
});

export default compose(
  withRedux,
  withConnect
)(EnhancedPage);
