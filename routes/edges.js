var edgeController = require('../controllers/edgecontroller.js');

module.exports = function(app, edges, edgetypes, nodes, nodetypes) {

  app.get('/edges', async function(req, res) {

    try {
      Edges = await edges.findAll({
        include: [
          { model: edgetypes, required: true},
          { model: nodes, as: 'sourceId', required: true, include: [{ model: nodetypes, required: true }] },
          { model: nodes, as: 'destinationId', required: true, include: [{ model: nodetypes, required: true }] }
        ]
      });
      EdgeTypes = await edgetypes.findAll({
        limit: 100,
        order: [
          ['name', 'ASC']
        ]
      });
      Nodes = await nodes.findAll({
        include: [
          { model: nodetypes, required: true}
        ]
      });
      NodeTypes = await nodetypes.findAll({
        limit: 100,
        order: [
          ['name', 'ASC']
        ]
      });
      edgeController.list(req, res, Edges, EdgeTypes, Nodes, NodeTypes);
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/edges/update', isLoggedIn, function(req, res) {
    try {
      edges.update({
        sourceNodeId: req.body.sourceNodeId,
        typeId: req.body.typeId,
        destinationNodeId: req.body.destinationNodeId,
        fromDate: (req.body.fromDate == '' ? null : req.body.fromDate),
        fromDateEra: (req.body.fromDateEra == 'AD' ? null : req.body.fromDateEra),
        toDate: (req.body.toDate == '' ? null : req.body.toDate),
        toDateEra: (req.body.toDateEra == 'AD' ? null : req.body.toDateEra),
        fact: req.body.fact,
        link: req.body.link,
        contributor: (req.body.checked == 'on' ? req.body.contributor : req.user.email),
        checked: (req.body.checked == 'on' ? true : false)
      },{
        where: { edgeId : req.body.edgeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edges');
  });

  app.post('/edges/add', isLoggedIn, function(req, res) {
    try {
      edges.create({
        sourceNodeId: req.body.sourceNodeId,
        typeId: req.body.typeId,
        destinationNodeId: req.body.destinationNodeId,
        fromDate: (req.body.fromDate == '' ? null : req.body.fromDate),
        fromDateEra: (req.body.fromDateEra == 'AD' ? null : req.body.fromDateEra),
        toDate: (req.body.toDate == '' ? null : req.body.toDate),
        toDateEra: (req.body.toDateEra == 'AD' ? null : req.body.toDateEra),
        fact: req.body.fact,
        link: req.body.link,
        contributor: req.user.email
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edges');
  });

  app.get('/edges/delete', isLoggedIn, function(req, res) {
    try {
      edges.destroy({
        where: { edgeId : req.query.edgeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edges');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

}
