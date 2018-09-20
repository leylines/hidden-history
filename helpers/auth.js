module.exports = {
  isAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.role == 'admin')
      return next();
    res.redirect('/');
  },
  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }
}
