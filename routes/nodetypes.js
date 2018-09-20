var nodetypeController = require('../controllers/nodetypecontroller.js');

module.exports = function(app, auth, nodetypes) {

  app.get('/nodetypes', function(req, res) {
    try {
      nodetypes.findAll({
        limit: 1000
      }).then(function(nodeTypes) {
        nodetypeController.list(req, res, nodeTypes);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/nodetypes/update', auth.isAdmin, function(req, res) {
    try {
      nodetypes.update({
        name: req.body.name,
        description: req.body.description
      },{
        where: { nodeTypeId : req.body.nodeTypeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodetypes');
  });

  app.post('/nodetypes/add', auth.isAdmin, function(req, res) {
    try {
      nodetypes.create({
          name: req.body.name,
          description: req.body.description
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodetypes');
  });

  app.get('/nodetypes/delete', auth.isAdmin, function(req, res) {
    try {
      nodetypes.destroy({
        where: { nodeTypeId : req.query.nodeTypeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/nodetypes');
  });

}
