var userController = require('../controllers/usercontroller.js');

module.exports = function(app, users) {

  app.get('/users', isAdmin, function(req, res) {
    try {
      users.findAll({
        limit: 1000
      }).then(function(Users) {
        userController.users(req, res, Users);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

  app.post('/users/update', isAdmin, function(req, res) {
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

  app.get('/users/delete', isAdmin, function(req, res) {
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

  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin')
      return next();
    res.redirect('/');
  }

}
