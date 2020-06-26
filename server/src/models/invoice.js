import Sequelize from "sequelize";
import sequelize from "../db";
import Staff from "./staff";
import Customer from "./customer";
import InvoiceDetail from "./invoice_detail";

const Invoice = sequelize.define('invoice', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    staff_id: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: '0'
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
    tableName: 'invoice'
});

//Invoice <-> Staff
Invoice.belongsTo(Staff, {foreignKey: 'staff_id', as: 'staff'});
Staff.hasMany(Invoice, {foreignKey: 'staff_id'});

//Invoice <-> Customer
Invoice.belongsTo(Customer, {foreignKey: 'customer_id', as: 'customer'});
Customer.hasMany(Invoice, {foreignKey: 'customer_id'});

//Invoice <-> InvoiceDetail
Invoice.hasMany(InvoiceDetail, {foreignKey: 'invoice_id', as: 'details'});
InvoiceDetail.belongsTo(Invoice, {foreignKey: 'invoice_id'});

export default Invoice;
