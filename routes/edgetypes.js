var edgetypeController = require('../controllers/edgetypecontroller.js');

module.exports = function(app, auth, edgetypes) {

  app.get('/edgetypes', function(req, res) {

    try {
      edgetypes.findAll({
        limit: 1000
      }).then(function(edgeTypes) {
        edgetypeController.list(req, res, edgeTypes);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/edgetypes/update', auth.isAdmin, function(req, res) {

    try {
      edgetypes.update({
        name: req.body.name,
        description: req.body.description
      },{
        where: { edgeTypeId : req.body.edgeTypeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edgetypes');
  });

  app.post('/edgetypes/add', auth.isAdmin, function(req, res) {

    try {
      edgetypes.create({
          name: req.body.name,
          description: req.body.description
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edgetypes');
  });

  app.get('/edgetypes/delete', auth.isAdmin, function(req, res) {
    try {
      edgetypes.destroy({
        where: { edgeTypeId : req.query.edgeTypeId }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/edgetypes');
  });

}
