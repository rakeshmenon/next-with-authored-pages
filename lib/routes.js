const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes() // ----   ----      -----
  .add('/:page', 'index'); // (none) complex   /:noname/:lang(en|es)/:wow+
