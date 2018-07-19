var exports = module.exports = {}

exports.list = function(req, res, edgetypes) {
  var context = {
    title: "Edit Edge-Types",
  };
  res.render('edgetypes', { context, edgetypes, req });
}

