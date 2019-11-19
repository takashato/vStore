/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('staff', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING(128),
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(64),
			allowNull: false
		},
		full_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		group_id: {
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
		tableName: 'staff'
	});
};
