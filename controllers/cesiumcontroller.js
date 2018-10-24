var exports = module.exports = {}

exports.main = function(req, res, topics) {
  res.render('cesium', {
    topics: topics,
    //topics: ['Antarctica', 'Freemasonry'],
    layout: 'cesium-layout',
    context: {
      title: 'Hidden-History Visualisation with Cesium',
    }	    
  });
}
