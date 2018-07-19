var visController = require('../controllers/viscontroller.js');

module.exports = function(app) {

  app.get('/vis', function(req, res) {
     visController.vis(req, res);
  });

}
