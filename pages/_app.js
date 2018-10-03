import React from 'react';
import App, { Container } from 'next/app';
import BaseComponent from './BaseLayoutEngine';
import { Router } from '../lib/routes';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class MyApp extends App {
  static async getInitialProps({ ctx, query }) {
    let pageProps = {};

    const response = await fetch(
      `http://localhost:5000/page-service${
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
