var exports = module.exports = {}

exports.list = function(req, res, users) {
  res.render('users', {
    title: "Hidden-History Users",
    req: req,
    users: users,
  });
}
