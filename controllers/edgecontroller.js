var exports = module.exports = {}

exports.list = function(req, res, edges, node2edge) {
  res.render('edges', {
    title: "Edit Edges",
    req: req,
    res: res,
    edges: edges,
    node2edge: node2edge,
  });
}
