var graphModelController = require('../controllers/graphmodelcontroller.js');

module.exports = function(app) {

  app.get('/graphmodel', function(req, res) {
     graphModelController.show(req, res);
  });

}
