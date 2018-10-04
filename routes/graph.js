var graphController = require('../controllers/graphcontroller.js');

module.exports = function(app) {

  app.get('/graph/model-n2n', function(req, res) {
     graphController.model(req, res, 'n2n');
  });

  app.get('/graph/model-nen', function(req, res) {
     graphController.model(req, res, 'nen');
  });

  app.get('/graph/visjs', function(req, res) {
     graphController.visjs(req, res);
  });

  app.get('/graph/force2d', function(req, res) {
     graphController.force2d(req, res);
  });

  app.get('/graph/force3d', function(req, res) {
     graphController.force3d(req, res);
  });

  app.get('/graph/force3dvr', function(req, res) {
     graphController.force3dvr(req, res);
  });

  app.get('/graph/timeline', function(req, res) {
     graphController.timeline(req, res);
  });

}
