var edge2nodeController = require('../controllers/edge2nodecontroller.js');

module.exports = function(app, auth, edge2node, nodetypes, edgetypes) {

  app.get('/edge2node', async function(req, res) {

    try {
      Edge2Node = await edge2node.findAll({
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
      edge2nodeController.list(req, res, Edge2Node, NodeTypes, EdgeTypes);
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/edge2node/add', auth.isAdmin, function(req, res) {

    try {
      edge2node.create({
          edgetypeEdgeTypeId: req.body.edgeTypeId,
          nodetypeNodeTypeId: req.body.nodeTypeId
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edge2node');
  });

  app.get('/edge2node/delete', auth.isAdmin, function(req, res) {
    try {
      edge2node.destroy({
        where: {
          edgetypeEdgeTypeId : req.query.edgeTypeId,
          nodetypeNodeTypeId : req.query.nodeTypeId
	}
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edge2node');
  });

}
