module.exports = function(sequelize, Sequelize) {
    var edge2node = sequelize.define('edge2node', {
    }, {
	schema: sequelize.config.schema
    });
    edge2node.associate = function (models) {
      edge2node.belongsTo(models.edgetype, {
         foreignKey: 'edgetypeEdgeTypeId',
         targetKey: 'edgeTypeId'
      });
      edge2node.belongsTo(models.nodetype, {
         foreignKey: 'nodetypeNodeTypeId',
         targetKey: 'nodeTypeId'
      });
    };
    return edge2node;
}
