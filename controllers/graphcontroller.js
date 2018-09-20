var exports = module.exports = {}

exports.visjs = function(req, res) {
  res.render('graph-visjs', {
    req: req,	  
    context: {
      title: 'Hidden-History Visualisation with Vis',
    }	    
  });
}

exports.model = function(req, res) {
  res.render('graph-model', {
    req: req,	  
    context: {
      title: 'Hidden-History Relations-Visualisation',
    }	    
  });
}

exports.force3d = function(req, res) {
  res.render('graph-force3d', {
    req: req,	  
    context: {
      title: 'Hidden-History Visualisation with Force-Graph-3D',
    }	    
  });
}

exports.force3dvr = function(req, res) {
  res.render('graph-force3d-vr', {
    title: 'Hidden-History VR Visualisation with Force-Graph-3D',
    layout: 'vr-layout'
  });
}
