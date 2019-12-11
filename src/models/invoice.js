/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('invoice', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		customer_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		staff_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		prepaid_value: {
			type: "DOUBLE",
			allowNull: true
		},
		total_value: {
			type: "DOUBLE",
			allowNull: true
		},
		discount_value: {
			type: "DOUBLE",
			allowNull: true
		},
		total_final_value: {
			type: "DOUBLE",
			allowNull: true
		},
		pay_method: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '0'
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
		tableName: 'invoice'
	});
};
