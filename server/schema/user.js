
module.exports = function(sequelize, DataTypes){
	return sequelize.define('user', {
		id:{
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username:{
			type: DataTypes.CHAR(64),
			allowNull: false
		},
		password:{
			type: DataTypes.CHAR(128),
			allowNull: false
		}
	},{
		tableName: 'user'
	});
};