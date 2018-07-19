module.exports = function(app, nodes, nodetypes) {

  app.get("/select/getnodesbyid", function(req, res){
    try {
      nodes.findAll({
        where: {
          typeId: req.query.nodeTypeId
        },
        order: [
          ['name', 'ASC']
        ]
      }).then(function(result) {
  	    return res.send(result);
      });
    }
    catch(e){
      console.log(e.toString());
    }
  });

}
