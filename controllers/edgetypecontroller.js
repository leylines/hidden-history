var exports = module.exports = {}

exports.list = function(req, res, edgetypes) {
  res.render('edgetypes', {
    title: "Edit Edge-Types",
    req: req,
    res: res,
    edgetypes: edgetypes,
  });
}
