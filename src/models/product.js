/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		bar_code: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		category_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		price: {
			type: "DOUBLE",
			allowNull: true
		},
		original_price: {
			type: "DOUBLE",
			allowNull: true
		},
		added_by: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		is_deleted: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
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
		tableName: 'product'
	});
};
