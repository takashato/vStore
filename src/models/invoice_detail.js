/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('invoice_detail', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		product_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		price: {
			type: "DOUBLE",
			allowNull: true
		},
		quantity: {
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
		}
	}, {
		tableName: 'invoice_detail'
	});
};
