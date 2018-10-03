const routes = require('next-routes');

// Name   Page      Pattern
module.exports = routes().add('/:page?', 'BaseLayoutEngine');
