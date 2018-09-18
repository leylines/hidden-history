var exports = module.exports = {}

exports.show = function(req, res) {
    var context = {
        title: "Hidden-History 2D-Visualisation",
    };
    res.render('graph2d', { context, req });
}
