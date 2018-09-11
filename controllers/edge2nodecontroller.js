var exports = module.exports = {}

exports.list = function(req, res, edge2node, nodetypes, edgetypes) {
  var context = {
    title: "Edit Edge-Node-Relations",
  };
  res.render('edge2node', { context, edge2node, nodetypes, edgetypes, req });
}

