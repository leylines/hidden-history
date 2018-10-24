var exports = module.exports = {}

exports.visjs = function(req, res) {
  res.render('graph-visjs', {
    title: 'Hidden-History Visualisation with Vis',
    req: req,	  
  });
}

exports.model = function(req, res, type) {
  res.render('graph-model', {
    title: 'Hidden-History Relations-Visualisation',
    req: req,	  
    type: type,  
  });
}

exports.force2d = function(req, res) {
  res.render('graph-force2d', {
    title: 'Hidden-History Visualisation with Force-Graph-2D',
    req: req,	  
  });
}

exports.force3d = function(req, res) {
  res.render('graph-force3d', {
    title: 'Hidden-History Visualisation with Force-Graph-3D',
    req: req,	  
  });
}

exports.force3dvr = function(req, res) {
  res.render('graph-force3d-vr', {
    title: 'Hidden-History VR Visualisation with Force-Graph-3D',
    layout: 'vr-layout'
  });
}

exports.timeline = function(req, res) {
  res.render('graph-timeline', {
    title: 'Hidden-History Visualisation with Timeline',
    req: req,	  
  });
}

