import React from 'react';
import App, { Container } from 'next/app';
import BaseComponent from './BaseLayoutEngine';
import { Router } from '../lib/routes';
import getConfig from 'next/config';

require('es6-promise').polyfill();
require('isomorphic-fetch');

const { publicRuntimeConfig } = getConfig();
console.log(publicRuntimeConfig);

export default class MyApp extends App {
  static async getInitialProps({ ctx }) {
    let pageProps = {};

    const response = await fetch(
      `${publicRuntimeConfig.PAGE_SERVICE_DOMAIN}/page-service${
        ctx.asPath === '/' ? '/home' : ctx.asPath
      }`,
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    pageProps.data = await response.json();

    if (BaseComponent.getInitialProps) {
      pageProps = await BaseComponent.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { pageProps } = this.props;

    return (
      <Container>
        <BaseComponent {...pageProps} />
      </Container>
    );
  }
}
