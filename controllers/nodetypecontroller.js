var exports = module.exports = {}

exports.list = function(req, res, nodetypes) {
  var context = {
    title: "Edit Node-Types",
  };
  res.render('nodetypes', { context, nodetypes, req });
}

