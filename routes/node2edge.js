var node2edgeController = require('../controllers/node2edgecontroller.js');

module.exports = function(app, auth, node2edge, nodetypes, edgetypes) {

  app.get('/node2edge', async function(req, res) {

    try {
      Node2Edge = await node2edge.findAll({
	include: [
          { model: nodetypes },
          { model: edgetypes }
	]
      });
      NodeTypes = await nodetypes.findAll({
        limit: 100,
        order: [
          ['name', 'ASC']
        ]
      });
      EdgeTypes = await edgetypes.findAll({
        limit: 100,
        order: [
          ['name', 'ASC']
        ]
      });
      node2edgeController.list(req, res, Node2Edge, NodeTypes, EdgeTypes);
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/node2edge/add', auth.isAdmin, function(req, res) {

    try {
      node2edge.create({
          nodetypeNodeTypeId: req.body.nodeTypeId,
          edgetypeEdgeTypeId: req.body.edgeTypeId
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/node2edge');
  });

  app.get('/node2edge/delete', auth.isAdmin, function(req, res) {
    try {
      node2edge.destroy({
        where: {
          nodetypeNodeTypeId : req.query.nodeTypeId,
          edgetypeEdgeTypeId : req.query.edgeTypeId
	}
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/node2edge');
  });

}
