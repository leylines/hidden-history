var exports = module.exports = {}

exports.list = function(req, res, edges, node2edge) {
  var context = {
    title: "Edit Edges",
  };
  res.render('edges', { context, edges, node2edge, req });
}
