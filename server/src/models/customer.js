/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customer', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		full_name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		phone_number: {
			type: DataTypes.STRING(20),
			allowNull: false
		},
		birthday: {
			type: DataTypes.DATEONLY,
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
		tableName: 'customer'
	});
};
