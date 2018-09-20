var graphController = require('../controllers/graphcontroller.js');

module.exports = function(app) {

  app.get('/graph/model', function(req, res) {
     graphController.model(req, res);
  });

  app.get('/graph/visjs', function(req, res) {
     graphController.visjs(req, res);
  });

  app.get('/graph/force3d', function(req, res) {
     graphController.force3d(req, res);
  });

  app.get('/graph/force3dvr', function(req, res) {
     graphController.force3dvr(req, res);
  });

}
