"use strict";

module.exports = function(sequelize, DataTypes) {
	var edgetype = sequelize.define('edgetype', {
		edgeTypeId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: 'compositeIndex'
		},
		description: {
			type: DataTypes.STRING
		}
	}, {
		freezeTableName: true,
		schema: 'hidden_forms'
	});
	return edgetype;
};

