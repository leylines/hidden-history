var exports = module.exports = {}

exports.list = function(req, res, edges, edgetypes, nodes, nodetypes) {
  var context = {
    title: "Edit Edges",
  };
  res.render('edges', { context, edges, edgetypes, nodes, nodetypes, req });
}
