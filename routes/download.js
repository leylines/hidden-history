module.exports = function(app, nodes, nodetypes, edges, edgetypes) {

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
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write("{\"nodes\":[");
      const nodeImportance = {};
      for(var i=0; i < NodeCount.length; i++){
	nodeImportance[NodeCount[i].dataValues.destinationNodeId] = NodeCount[i].dataValues.nodeValue;
      }
      for(var i=0; i < Nodes.length; i++){
        var value;
        if (nodeImportance[Nodes[i].nodeId]) {
          value = nodeImportance[Nodes[i].nodeId] * 2;
        } else {
          value = 1;
        }
        if (i == Nodes.length - 1) {
	  if (nodeImportance[Nodes[i].nodeId]) { console.log(Nodes[i].name + " has value " + nodeImportance[Nodes[i].nodeId]) };
          res.write("{\"id\":\"" + Nodes[i].nodeId + "\",\"label\":\"" + Nodes[i].name + "\",\"group\":\"" + Nodes[i].nodetype.name + "\",\"value\":\"" + value + "\"}");
        } else { 
          res.write("{\"id\":\"" + Nodes[i].nodeId + "\",\"label\":\"" + Nodes[i].name + "\",\"group\":\"" + Nodes[i].nodetype.name + "\",\"value\":\"" + value + "\"},");
        }
      }
      res.write("], \"links\":[");
      for(var i=0; i < Edges.length; i++){
        var value;
        if (nodeImportance[Edges[i].sourceNodeId]) {
          value = nodeImportance[Edges[i].sourceNodeId] * 0.5;
        } else {
          value = 0.5;
        }
        if (i == Edges.length - 1) {
          res.write("{\"id\":\"" + Edges[i].edgeId + "\",\"from\":\"" + Edges[i].sourceNodeId + "\",\"to\":\"" + Edges[i].destinationNodeId + "\",\"label\":\"" + Edges[i].edgetype.name + "\",\"val\":\"" + value + "\"}");
        } else { 
          res.write("{\"id\":\"" + Edges[i].edgeId + "\",\"from\":\"" + Edges[i].sourceNodeId + "\",\"to\":\"" + Edges[i].destinationNodeId + "\",\"label\":\"" + Edges[i].edgetype.name + "\",\"val\":\"" + value + "\"},");
        }
      }
      res.write("]}");
      res.end();
    }
    catch(e){
      console.log(e.toString());
    }

  });
}


