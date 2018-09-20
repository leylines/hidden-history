var exports = module.exports = {}

exports.visjs = function(req, res) {
    var context = {
        title: "Hidden-History Visualisation with Vis",
    };
    res.render('graph-visjs', { context, req });
}

exports.model = function(req, res) {
    var context = {
        title: "Hidden-History DB-Model-Visualisation",
    };
    res.render('graph-model', { context, req });
}

exports.force3d = function(req, res) {
    var context = {
        title: "Hidden-History Visualisation with Force-Graph-3D",
    };
    res.render('graph-force3d', { context, req });
}
