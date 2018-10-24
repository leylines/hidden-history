var exports = module.exports = {}

exports.list = function(req, res, node2edge, nodetypes, edgetypes) {
  res.render('node2edge', {
    title: "Edit Node-Edge-Relations",
    req: req,
    edge2node: node2edge,
    nodetypes: nodetypes,
    edgetypes: edgetypes,
  });
}

