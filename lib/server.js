// const next = require('next');
// const routes = require('./routes');
// const app = next({ dev: process.env.NODE_ENV !== 'production' });
// const handler = routes.getRequestHandler(app);
// const express = require('express');

// const options = {
//   root: __dirname + '/../static/',
//   headers: {
//     'Content-Type': 'text/plain;charset=UTF-8'
//   }
// };

// app.prepare().then(() => {
//   const server = express();
//   server.get('/robots.txt', (req, res) =>
//     res.status(200).sendFile('robots.txt', options)
//   );
//   server.get('/favicon.ico', (req, res) =>
//     res.status(200).sendFile('favicon.ico', options)
//   );
//   server.use(handler);
//   server.listen(3000);
// });

const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  server.use(serve(__dirname + '/../static'));

  router.get('*', async ctx => {
    await requestHandler(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
