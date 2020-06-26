import Sequelize from "sequelize";
import sequelize from "../db";
import Product from "./product";

const ReceiptDetail = sequelize.define('receipt_detail', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    receipt_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    product_id: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    tableName: 'receipt_detail'
});

ReceiptDetail.Product = ReceiptDetail.belongsTo(Product, {foreignKey: 'product_id', as: 'product'});
Product.hasMany(ReceiptDetail, {foreignKey: 'product_id'});

export default ReceiptDetail;
