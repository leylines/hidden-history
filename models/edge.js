"use strict";

module.exports = function(sequelize, DataTypes) {
	var edges = sequelize.define('edges', {
		edgeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		fromDate: {
			type: DataTypes.DATE
		},
		fromDateEra: {
			type: DataTypes.STRING
		},
		toDate: {
			type: DataTypes.DATE
		},
		toDateEra: {
			type: DataTypes.STRING
		},
		fact: {
			type: DataTypes.STRING
		},
		link: {
			type: DataTypes.STRING
		},
		contributor: {
			type: DataTypes.STRING
		},
		checked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
		freezeTableName: true,
		schema: sequelize.config.schema
	});


    edges.associate = function (models) {
      edges.belongsTo(models.edgetype, {
        foreignKey: 'typeId',
        targetKey: 'edgeTypeId'
      });
      edges.belongsTo(models.nodes, {
        as: 'sourceId',
        foreignKey: 'sourceNodeId',
        targetKey: 'nodeId'
      });
      edges.belongsTo(models.nodes, {
        as: 'destinationId',
        foreignKey: 'destinationNodeId',
        targetKey: 'nodeId'
      });
    };

	return edges;
};

