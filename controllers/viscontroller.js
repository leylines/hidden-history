var exports = module.exports = {}

exports.vis = function(req, res) {
    var context = {
        title: "Hidden-History Visualisation",
    };
    res.render('visualisation', { context, req });
}
