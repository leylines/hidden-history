"use strict";

module.exports = function(sequelize, DataTypes) {
   var edges = sequelize.define('edges', {
      edgeId: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true
      },
      fromDate: {
         type: DataTypes.BIGINT
      },
      toDate: {
         type: DataTypes.BIGINT
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
      schema: sequelize.config.schema,
      setterMethods : {
         fromDate: function(newValue) {
            if (newValue) {
               var [newDate, newEra] = newValue.split('|');
               var [year, month, day] = newDate.split('-');
               month--;
               var fullYear = newEra == 'BC'? year = year * -1 : year;
               var dbDate = new Date();
               dbDate.setUTCFullYear(fullYear);
               dbDate.setUTCMonth(month);
               dbDate.setUTCDate(day);
               dbDate.setUTCHours(0, 0, 0, 0);
               this.setDataValue('fromDate', dbDate.valueOf());
            }
            return;
         },
         toDate: function(newValue)  {
            if (newValue) {
               var [newDate, newEra] = newValue.split('|');
               var [year, month, day] = newDate.split('-');
               month--;
               var fullYear = newEra == 'BC'? year = year * -1 : year;
               var dbDate = new Date();
               dbDate.setUTCFullYear(year);
               dbDate.setUTCMonth(month);
               dbDate.setUTCDate(day);
               dbDate.setUTCHours(0, 0, 0, 0);
               this.setDataValue('toDate', dbDate.valueOf());
            }
            return;
         }
      },
      getterMethods   : {
         fromDate: function() {
            var dbDate = this.getDataValue('fromDate');
            if (dbDate) {
               var jsDate = new Date(parseInt(dbDate));
               var year = Math.abs(jsDate.getUTCFullYear());
               var month = jsDate.getUTCMonth()+1;
               var day = jsDate.getUTCDate();
               var readable = (year < 1000? '0' : '') + (year < 100? '0' : '') + (year < 10? '0' : '') + year + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
               return readable;
            } else {
               return;
            }
         },
         fromDateEra: function() {
            var dbDate = this.getDataValue('fromDate');
            if (dbDate && dbDate < -62167222799621) {
               return 'BC';
            }
            return;
         },
         toDate: function() {
            var dbDate = this.getDataValue('toDate');
            if (dbDate) {
               var jsDate = new Date(parseInt(dbDate));
               var year = Math.abs(jsDate.getUTCFullYear());
               var month = jsDate.getUTCMonth()+1;
               var day = jsDate.getUTCDate();
               var readable = (year < 1000? '0' : '') + (year < 100? '0' : '') + (year < 10? '0' : '') + year + "-" + (month < 10 ? '0' : '') + month + "-" + (day < 10 ? '0' : '') + day;
               return readable;
            } else {
               return;
            }
         },
         toDateEra: function() {
            var dbDate = this.getDataValue('toDate');
            if (dbDate) {
               if (dbDate < -62167222799621) {
                  return 'BC';
               }
            }
            return;
         }
      }
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

