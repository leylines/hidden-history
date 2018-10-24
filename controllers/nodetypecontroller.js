var exports = module.exports = {}

exports.list = function(req, res, nodetypes) {
  res.render('nodetypes', {
    title: "Edit Node-Types",
    req: req,
    nodetypes: nodetypes,
  });
}
