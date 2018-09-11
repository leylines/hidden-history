var exports = module.exports = {}

exports.list = function(req, res, node2edge, nodetypes, edgetypes) {
  var context = {
    title: "Edit Node-Edge-Relations",
  };
  res.render('node2edge', { context, node2edge, nodetypes, edgetypes, req });
}

