import React from 'react';
import App, { Container } from 'next/app';
import BaseComponent from './index';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default class MyApp extends App {
  static async getInitialProps({ ctx }) {
    let pageProps = {};

    const response = await fetch(
      `http://localhost:5000/page-service${
        ctx.pathname === '/' ? '/home' : ctx.pathname
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
