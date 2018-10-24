var userController = require('../controllers/usercontroller.js');

module.exports = function(app, auth, users) {

  app.get('/users', auth.isAdmin, function(req, res) {
    try {
      users.findAll({
        limit: 1000
      }).then(function(Users) {
        userController.list(req, res, Users);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/users/update', auth.isAdmin, function(req, res) {
    try {
      users.update({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role
      },{
        where: { id : req.body.id }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/users');
  });

  app.get('/users/delete', auth.isAdmin, function(req, res) {
    try {
      users.destroy({
        where: { id : req.query.id }
      });
    }
    catch(e){
      console.log(e.toString());
    }
    res.redirect('/users');
  });

}
