module.exports = function(sequelize, Sequelize) {
    var node2edge = sequelize.define('node2edge', {
    }, {
	schema: sequelize.config.schema
    });
    node2edge.associate = function (models) {
      node2edge.belongsTo(models.nodetype, {
         foreignKey: 'nodetypeNodeTypeId',
         targetKey: 'nodeTypeId'
      });
      node2edge.belongsTo(models.edgetype, {
         foreignKey: 'edgetypeEdgeTypeId',
         targetKey: 'edgeTypeId'
      });
    };
    return node2edge;
}
