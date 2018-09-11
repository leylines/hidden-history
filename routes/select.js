module.exports = function(app, nodes, node2edge, edgetypes, edge2node, nodetypes) {

  app.get("/select/getnodesbyid", function(req, res){
    try {
      nodes.findAll({
        where: {
          typeId: req.query.nodeTypeId
        },
	attributes: ['nodeId', 'name'],
        order: [
          ['name', 'ASC']
        ]
      }).then(function(result) {
  	    return res.send(result);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.get("/select/getedgetypes", function(req, res){
    try {
      node2edge.findAll({
        where: {
          nodetypeNodeTypeId: req.query.nodeTypeId
        },
        attributes: ['edgetypeEdgeTypeId'],
        include: [
          { model: edgetypes }
        ],
        order: [
          [ { model: edgetypes }, 'name', 'ASC' ]
        ]
      }).then(function(result) {
  	    return res.send(result);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.get("/select/getnodetypes", function(req, res){
    try {
      edge2node.findAll({
        where: {
          edgetypeEdgeTypeId: req.query.edgeTypeId
        },
        attributes: ['nodetypeNodeTypeId'],
        include: [
          { model: nodetypes }
        ],
        order: [
          [ { model: nodetypes }, 'name', 'ASC' ]
        ]
      }).then(function(result) {
  	    return res.send(result);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });
}

