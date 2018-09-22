var exports = module.exports = {}

exports.index = function(req, res) {
    var context = {
        title: "Hidden-History Database",
    };
    res.render('index', { context, req });
}

exports.gallery = function(req, res) {
    var context = {
        title: "Hidden-History Gallery",
    };
    res.render('gallery', { context, req });
}

exports.signup = function(req, res) {
    var context = {
        title: "Hidden-History Signup",
    };
    res.render('signup', { context, req });
}

exports.dashboard = function(req, res, nodes, edges) {
    var context = {
        title: "Hidden-History Dashboard",
    };
    res.render('dashboard', { context, req, nodes, edges });
}

exports.impressum = function(req, res) {
    var context = {
        title: "Hidden-History Impressum",
    };
    res.render('impressum', { context, req });
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}
