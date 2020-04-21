/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('setting_group', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		varname: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		active: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: '1'
		},
		index: {
			type: DataTypes.INTEGER(11),
			allowNull: false
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
		tableName: 'setting_group'
	});
};
