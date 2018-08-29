var graph3dController = require('../controllers/graph3dcontroller.js');

module.exports = function(app) {

  app.get('/graph3d', function(req, res) {
     graph3dController.show(req, res);
  });

}
