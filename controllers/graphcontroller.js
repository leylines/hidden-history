var exports = module.exports = {}

exports.show = function(req, res) {
    var context = {
        title: "Hidden-History Visualisation",
    };
    res.render('graph', { context, req });
}
