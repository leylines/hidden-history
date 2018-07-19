"use strict";

module.exports = function(sequelize, DataTypes) {
	var nodes = sequelize.define('nodes', {
		nodeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'compositeIndex'
		},
		otherName: {
			type: DataTypes.STRING,
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
		schema: 'hidden_forms'
	});

    nodes.associate = function (models) {
      nodes.belongsTo(models.nodetype, {
        foreignKey: 'typeId',
        targetKey: 'nodeTypeId'
      });
    };

	return nodes;
};

