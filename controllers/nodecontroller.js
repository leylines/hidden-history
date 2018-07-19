var exports = module.exports = {}

exports.list = function(req, res, nodes, nodetypes) {
  var context = {
    title: "Edit Nodes"
  };
  res.render('nodes', { context, nodes, nodetypes, req });
}
