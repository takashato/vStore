/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('receipt_detail', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		receipt_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		product_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		price: {
			type: "DOUBLE",
			allowNull: true
		},
		amount: {
			type: "DOUBLE",
			allowNull: true
		},
		total_money: {
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
		tableName: 'receipt_detail'
	});
};
