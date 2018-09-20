var nodeController = require('../controllers/nodecontroller.js');

module.exports = function(app, auth, nodes, nodetypes) {

  app.get('/nodes', async function(req, res) {
    try {
      Nodes = await nodes.findAll({
        include: [{
          model: nodetypes,
          required: true
        }]
      });
      NodeTypes = await nodetypes.findAll({
        limit: 100,
        order: [
          ['name', 'ASC']
        ]
      });
      nodeController.list(req, res, Nodes, NodeTypes);
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/nodes/update', auth.isLoggedIn, function(req, res) {
    try {
      nodes.update({
        name: req.body.name,
        otherName: req.body.otherName,
        fromDate: (req.body.fromDate == '' ? null : req.body.fromDate + "|" + req.body.fromDateEra),
        toDate: (req.body.toDate == '' ? null : req.body.toDate + "|" + req.body.toDateEra),
        typeId: req.body.typeId,
        link: req.body.link,
        contributor: (req.body.checked == 'on' ? req.body.contributor : req.user.email),
        checked: (req.body.checked == 'on' ? true : false)
      },{
        where: { nodeId : req.body.nodeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodes');
  });

  app.post('/nodes/add', auth.isLoggedIn, function(req, res) {
    try {
      nodes.create({
        name: req.body.name,
        otherName: req.body.otherName,
        contributor: req.user.email,
        fromDate: (req.body.fromDate == '' ? null : req.body.fromDate),
        fromDateEra: (req.body.fromDateEra == 'AD' ? null : req.body.fromDateEra),
        toDate: (req.body.toDate == '' ? null : req.body.toDate),
        toDateEra: (req.body.toDateEra == 'AD' ? null : req.body.toDateEra),
        typeId: req.body.typeId,
        link: req.body.link
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodes');
  });

  app.get('/nodes/delete', auth.isLoggedIn, function(req, res) {
    try {
      nodes.destroy({
        where: { nodeId : req.query.nodeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodes');
  });

}
