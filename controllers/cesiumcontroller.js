var exports = module.exports = {}

exports.main = function(req, res, topics) {
  res.render('cesium', {
    topics: topics,
    layout: 'cesium-layout',
    title: 'Hidden-History Visualisation with Cesium',
  });
}
