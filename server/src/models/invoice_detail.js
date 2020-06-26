import Sequelize from "sequelize";
import sequelize from "../db";
import Product from "./product";

const InvoiceDetail = sequelize.define('invoice_detail', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    invoice_id: {
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
    tableName: 'invoice_detail'
});

InvoiceDetail.belongsTo(Product, {foreignKey: 'product_id', as: 'product'});
Product.hasMany(InvoiceDetail, {foreignKey: 'product_id'});

export default InvoiceDetail;
