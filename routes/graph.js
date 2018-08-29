var graphController = require('../controllers/graphcontroller.js');

module.exports = function(app) {

  app.get('/graph', function(req, res) {
     graphController.show(req, res);
  });

}
