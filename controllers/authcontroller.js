var exports = module.exports = {}

exports.index = function(req, res) {
  res.render('index', {
    title: "Hidden-History Database",
    req: req,
  });
}

exports.gallery = function(req, res) {
  res.render('gallery', {
    title: "Hidden-History Gallery",
    req: req,
  });
}

exports.signup = function(req, res) {
  res.render('signup', {
    title: "Hidden-History Signup",
    req: req,
  });
}

exports.dashboard = function(req, res, nodes, edges) {
  res.render('dashboard', {
    title: "Hidden-History Dashboard",
    req: req,
    nodes: nodes,
    edges: edges,
  });
}

exports.impressum = function(req, res) {
  res.render('impressum', {
    title: "Hidden-History Impressum",
    req: req,
  });
}

exports.logout = function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
}
