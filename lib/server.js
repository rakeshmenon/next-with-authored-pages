const http2 = require('http2');
const fs = require('fs');
const next = require('next');
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');

const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const requestHandler = routes.getRequestHandler(app);

const certOptions = {
  key: fs.readFileSync(__dirname + '/../certificate/server.key'),
  cert: fs.readFileSync(__dirname + '/../certificate/server.crt')
};

app.prepare().then(() => {
  const app = new Koa();
  const router = new Router();

  app.use(serve(__dirname + '/../static'));

  router.get('*', async ctx => {
    await requestHandler(ctx.req, ctx.res);
    ctx.respond = false;
  });

  app.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    try {
      await next();
    } catch (err) {}
  });

  app.use(router.routes());

  const server = http2.createSecureServer(certOptions, app.callback());

  server.listen(port, () => {
    console.log(`> Ready on https://localhost:${port}`);
  });
});
