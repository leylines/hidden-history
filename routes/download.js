module.exports = function(app, nodes, nodetypes, node2edge, edges, edgetypes, edge2node) {

  app.get('/download/cypher', async function(req, res) {

    try {
      Nodes = await nodes.findAll({
        include: [{
          model: nodetypes,
          required: true
        }]
      })
      NodeTypes = await nodetypes.findAll({
        limit: 100
      })
      Edges = await edges.findAll({
        include: [
          { model: edgetypes, required: true},
          { model: nodes, as: 'sourceId', required: true, include: [{ model: nodetypes, required: true }] },
          { model: nodes, as: 'destinationId', required: true, include: [{ model: nodetypes, required: true }] }
        ]
      });
      EdgeTypes = await edgetypes.findAll({
        limit: 100
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.write("DROP GRAPH hidden_graph CASCADE;\nCREATE GRAPH hidden_graph;\nSET graph_path = hidden_graph;\n");

      for(var i=0; i<NodeTypes.length; i++){
        res.write("CREATE VLABEL " + NodeTypes[i].name + ";\n");
      }
      for(var i=0; i<EdgeTypes.length; i++){
        res.write("CREATE ELABEL " + EdgeTypes[i].name + ";\n");
      }
      // CREATE (n:place {name: 'England'});
      for(var i=0; i<Nodes.length; i++){
        if (Nodes[i].checked == "false") {
          continue;
        }
        var attributes = " {name: \'" + Nodes[i].name;
        if (Nodes[i].otherName) {
          attributes += "\', other_name: \'" + Nodes[i].otherName;
        }
        if (Nodes[i].fromDate && Nodes[i].fromDateEra) {
          attributes += "\', fromdate: \'" + Nodes[i].fromDate.toISOString().slice(0, 10) + " " + Nodes[i].fromDateEra;
        } else if (Nodes[i].fromDate) {
          attributes += "\', fromdate: \'" + Nodes[i].fromDate.toISOString().slice(0, 10);
        }
        if (Nodes[i].toDate && Nodes[i].toDateEra) {
          attributes += "\', todate: \'" + Nodes[i].toDate.toISOString().slice(0, 10) + " " + Nodes[i].toDateEra;
        } else if (Nodes[i].toDate) {
          attributes += "\', todate: \'" + Nodes[i].toDate.toISOString().slice(0, 10);
        }
        if (Nodes[i].link) {
          attributes += "\', link: \'" + Nodes[i].link;
        }
        attributes += "\'});\n";
        var result = "CREATE (n:" + Nodes[i].nodetype.name + attributes;
        result = result.replace(/(\'[a-zA-Z\s]+)'([a-zA-Z\s]+\')/, '$1\'\'$2');
        res.write(result);
      }
      // MATCH  (s:place {name: 'Germany'}),(d:place {name: 'Europe'}) CREATE (s)-[:located {status: 'proven'}]->(d);
      for(var i=0; i<Edges.length; i++){
        if (Edges[i].checked == "false") {
          continue;
        }
        var attributes = " {fact: \'" + Edges[i].fact;
        if (Edges[i].fromDate && Edges[i].fromDateEra) {
          attributes += "\', fromdate: \'" + Edges[i].fromDate.toISOString().slice(0, 10) + " " + Edges[i].fromDateEra;
        } else if (Edges[i].fromDate) {
          attributes += "\', fromdate: \'" + Edges[i].fromDate.toISOString().slice(0, 10);
        }
        if (Edges[i].toDate && Edges[i].toDateEra) {
          attributes += "\', todate: \'" + Edges[i].toDate.toISOString().slice(0, 10) + " " + Edges[i].toDateEra;
        } else if (Edges[i].toDate) {
          attributes += "\', todate: \'" + Edges[i].toDate.toISOString().slice(0, 10);
        }
        if (Edges[i].link) {
          attributes += "\', link: \'" + Edges[i].link;
        }
        attributes += "\'}";
        var result = "MATCH  (s:" + Edges[i].sourceId.nodetype.name + " {name: \'" + Edges[i].sourceId.name + "\'}),(d:" + Edges[i].destinationId.nodetype.name + " {name: \'" + Edges[i].destinationId.name + "\'}) CREATE (s)-[:" + Edges[i].edgetype.name + attributes + "]->(d);\n";
        result = result.replace(/(\'[a-zA-Z\s]+)'([a-zA-Z\s]+\')/, '$1\'\'$2');
        res.write(result);
      }
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });

  app.get('/download/json', async function(req, res) {

    try {
      Nodes = await nodes.findAll({
        limit: 10000,
        include: [
          { model: nodetypes, required: true }
        ],
        order: [
          ['nodeId', 'ASC']
        ]
      });
      Edges = await edges.findAll({
        limit: 10000,
        include: [
          { model: edgetypes, required: true }
        ],
      });
      NodeCount = await edges.findAll({
        group: ['destinationNodeId'],
        attributes: ['destinationNodeId', [edges.sequelize.fn('COUNT', edges.sequelize.col('destinationNodeId')), 'nodeValue']]
      });

      var nodeImportance = {};
      var networkobj = {};
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      for(var i=0; i < NodeCount.length; i++){
	nodeImportance[NodeCount[i].dataValues.destinationNodeId] = NodeCount[i].dataValues.nodeValue;
      }

      var nodeobj = {};
      for(var i=0; i < Nodes.length; i++){
        nodeobj[Nodes[i].nodeId] = {};
        nodeobj[Nodes[i].nodeId]['value'] = 0;
      }

      var edgesobj = [];
      for(var i=0; i < Edges.length; i++){
        var value;
	if (Edges[i].edgetype.name == "located") {
          value = 1;
	} else if (nodeImportance[Edges[i].sourceNodeId]) {
          value = nodeImportance[Edges[i].sourceNodeId];
	  if (value > 2) {
	    nodeobj[Edges[i].destinationNodeId]['value'] += parseInt(value);
	  }
        } else {
          value = 2.0;
        }
        edgesobj.push({
            id:     Edges[i].edgeId,
            source: Edges[i].sourceNodeId,
	    target: Edges[i].destinationNodeId,
	    label:  Edges[i].edgetype.name,
	    val:    value
        });
      }
      networkobj.links = edgesobj;

      var nodesobj = [];
      for(var i=0; i < Nodes.length; i++){
        var value;
	if (Nodes[i].nodetype.name == "place") {
          value = 2.0;
	} else if (nodeImportance[Nodes[i].nodeId]) {
          value = (nodeImportance[Nodes[i].nodeId] * 1.5) + (nodeobj[Nodes[i].nodeId]['value'] * 1.5);
        } else {
          value = 3.0;
        }
        nodesobj.push({
            id:    Nodes[i].nodeId,
            label: Nodes[i].name,
	    group: Nodes[i].nodetype.name,
	    val:   value
        });
      }
      networkobj.nodes = nodesobj;

      res.write(JSON.stringify(networkobj));
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });

  app.get('/download/timeline', async function(req, res) {

    try {
      Nodes = await nodes.findAll({
        limit: 10000,
        include: [
          { model: nodetypes, required: true }
        ],
        order: [
          ['nodeId', 'ASC']
        ]
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      var timelineobj = [];
      var groupobj = {};
      for(var i=0; i < Nodes.length; i++){
	if (typeof groupobj[Nodes[i].nodetype.name] == "undefined") {
	  groupobj[Nodes[i].nodetype.name] = {};
	  groupobj[Nodes[i].nodetype.name]['group'] = Nodes[i].nodetype.name;
	  groupobj[Nodes[i].nodetype.name]['data'] = [];
	}
	//console.log(Nodes[i].fromDate)
	if (typeof Nodes[i].fromDate == "undefined") {
	   Nodes[i].fromDate = "1900-01-01";
	}
	if (typeof Nodes[i].toDate == "undefined") {
	   Nodes[i].toDate = "2020-01-01";
	}
        groupobj[Nodes[i].nodetype.name]['data'].push({
            label: Nodes[i].name,
	    data: [{
	     timeRange: [Nodes[i].fromDate, Nodes[i].toDate],
	     val: Nodes[i].name,
	    }],
        });
      }

      for(var key in groupobj) {
	if (key != "place") {
	  timelineobj.push(groupobj[key]);
	}
      }
	    
      res.write(JSON.stringify(timelineobj));
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });

  app.get('/download/model-n2n', async function(req, res) {
    try {
      NodeTypes = await nodetypes.findAll({
        limit: 10000,
      });
      EdgeTypes = await edgetypes.findAll({
        limit: 10000,
      });
      Node2Edge = await node2edge.findAll({
        include: [
          { model: nodetypes },
          { model: edgetypes }
        ]
      });
      Edge2Node = await edge2node.findAll({
        include: [
          { model: nodetypes },
          { model: edgetypes }
        ]
      });
      var networkobj = {};

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      var nodesobj = [];
      for(var i=0; i < NodeTypes.length; i++){
        nodesobj.push({
            id:    NodeTypes[i].nodeTypeId,
            label: NodeTypes[i].name,
            val:   0.1 
        });
      }
      networkobj.nodes = nodesobj;

      var edgesobj = [];
      for(var i=0; i < EdgeTypes.length; i++){
        for(var j=0; j < Node2Edge.length; j++){
	  if (Node2Edge[j].edgetypeEdgeTypeId ==  EdgeTypes[i].edgeTypeId) {
            for(var k=0; k < Edge2Node.length; k++){
	      if (Edge2Node[k].edgetypeEdgeTypeId ==  EdgeTypes[i].edgeTypeId) {
                edgesobj.push({
                  source: Node2Edge[j].nodetypeNodeTypeId,
	          target: Edge2Node[k].nodetypeNodeTypeId,
                  label: EdgeTypes[i].name,
                });
              }
            }
          }
        }
      }
      networkobj.links = edgesobj;
      res.write(JSON.stringify(networkobj));
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });

  app.get('/download/model-nen', async function(req, res) {
    try {
      NodeTypes = await nodetypes.findAll({
        limit: 10000,
      });
      EdgeTypes = await edgetypes.findAll({
        limit: 10000,
      });
      Node2Edge = await node2edge.findAll({
        include: [
          { model: nodetypes },
          { model: edgetypes }
        ]
      });
      Edge2Node = await edge2node.findAll({
        include: [
          { model: nodetypes },
          { model: edgetypes }
        ]
      });
      var networkobj = {};

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');

      var nodesobj = [];
      for(var i=0; i < NodeTypes.length; i++){
        nodesobj.push({
            id:    NodeTypes[i].nodeTypeId,
            label: NodeTypes[i].name,
            value: 0.1 
        });
      }
      for(var i=0; i < EdgeTypes.length; i++){
        nodesobj.push({
            id:    parseInt(EdgeTypes[i].edgeTypeId) + 10000,
            label: EdgeTypes[i].name,
            value: 1
        });
      }
      networkobj.nodes = nodesobj;

      var edgesobj = [];
      for(var i=0; i < Node2Edge.length; i++){
        edgesobj.push({
            id:     i + 1000,
            source: Node2Edge[i].nodetypeNodeTypeId,
            target: parseInt(Node2Edge[i].edgetypeEdgeTypeId) + 10000,
        });
      }
      for(var i=0; i < Edge2Node.length; i++){
        edgesobj.push({
            id:     i + 2000,
            source: parseInt(Edge2Node[i].edgetypeEdgeTypeId) + 10000,
            target: Edge2Node[i].nodetypeNodeTypeId,
        });
      }
      networkobj.links = edgesobj;
      res.write(JSON.stringify(networkobj));
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });
}
