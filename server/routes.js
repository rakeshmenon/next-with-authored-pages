const routes = require('next-routes');

module.exports = routes().add('/:page?', 'BaseLayoutEngine');
