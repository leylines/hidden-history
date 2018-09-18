var graph2dController = require('../controllers/graph2dcontroller.js');

module.exports = function(app) {

  app.get('/graph2d', function(req, res) {
     graph2dController.show(req, res);
  });

}
