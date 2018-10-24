var exports = module.exports = {}

exports.list = function(req, res, edge2node, nodetypes, edgetypes) {
  res.render('edge2node', {
    title: "Edit Edge-Node-Relations",
    req: req,
    edge2node: edge2node,
    nodetypes: nodetypes,
    edgetypes: edgetypes,
  });
}

