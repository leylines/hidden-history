var exports = module.exports = {}

exports.list = function(req, res, nodes, nodetypes) {
  res.render('nodes', {
    title: "Edit Nodes",
    req: req,
    nodes: nodes,
    nodetypes: nodetypes,
  });
}

