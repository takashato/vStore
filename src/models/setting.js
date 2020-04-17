/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('setting', {
		varname: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true
		},
		value: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		default_value: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		formatter: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'setting'
	});
};
