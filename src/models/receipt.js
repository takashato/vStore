/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('receipt', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		source: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		staff_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		customer_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		total: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		total_money: {
			type: "DOUBLE",
			allowNull: true
		},
		total_amount: {
			type: "DOUBLE",
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
		tableName: 'receipt'
	});
};
