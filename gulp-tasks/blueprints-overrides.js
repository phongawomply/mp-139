/**
 * Ideally to add new overrides create them
 * in another .js file and export them into the
 * array exported here.
 * ex
 * var someOverride = require('./someFile.js');
 * var someOverride1 = require('./someFile1.js');
 *
 * module.exports = [
 * someOverride,
 * someOverride1
 * ]
 *
**/

module.exports = [
  function(server) {
    server.all('*', function(req, res, next) {
      if(req.params[0].split('/')[2] === '250') {
        console.log('hit override');
      }
      next();
    });
  }
];
