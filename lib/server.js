const next = require('next');
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app);
const express = require('express');
const http2 = require('http2');
const fs = require('fs');

const options = {
  root: __dirname + '/../static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
};

const certOptions = {
  key: fs.readFileSync(__dirname + '/../certificate/server.key'),
  cert: fs.readFileSync(__dirname + '/../certificate/server.crt')
};

app.prepare().then(() => {
  const app = express();
  require('express-http2-workaround')({
    express: express,
    http2: http2,
    app: app
  });

  const server = http2.createSecureServer(certOptions, app);

  app.get('/robots.txt', (req, res) =>
    res.status(200).sendFile('robots.txt', options)
  );
  app.get('/favicon.ico', (req, res) =>
    res.status(200).sendFile('favicon.ico', options)
  );
  app.use(handler);

  server.listen(3000, function() {
    console.log('Express HTTP/2 server started');
  });
});
