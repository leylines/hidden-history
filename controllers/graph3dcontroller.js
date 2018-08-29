var exports = module.exports = {}

exports.show = function(req, res) {
    var context = {
        title: "Hidden-History 3D-Visualisation",
    };
    res.render('graph3d', { context, req });
}
