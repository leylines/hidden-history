var cesiumController = require('../controllers/cesiumcontroller.js');

module.exports = function(app, nodes, nodetypes) {

  app.get('/cesium', function(req, res) {
    try {
      nodes.findAll({
        attributes: ['name'],
        include: [{
          model: nodetypes,
          where: { name: 'special topic' },
	}],
        order: [
          ['name', 'ASC']
        ]
      }).then(function(topics) {
        cesiumController.main(req, res, topics);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

}
