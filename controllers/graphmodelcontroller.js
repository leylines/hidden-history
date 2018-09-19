var exports = module.exports = {}

exports.show = function(req, res) {
    var context = {
        title: "Hidden-History Model-Visualisation",
    };
    res.render('graphmodel', { context, req });
}
