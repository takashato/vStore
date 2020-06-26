import Sequelize from "sequelize";
import sequelize from "../db";
import Staff from "./staff";
import Customer from "./customer";
import ReceiptDetail from "./receipt_detail";

const Receipt = sequelize.define('receipt', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    source: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    staff_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    total: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DATE,
        allowNull: true
    },
    updated_at: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    tableName: 'receipt'
});

// Receipt <-> Staff
Receipt.Staff = Receipt.belongsTo(Staff, {foreignKey: 'staff_id', as: 'staff'});
Staff.hasMany(Receipt, {foreignKey: 'staff_id'});
// Receipt <-> Customer
Receipt.Customer = Receipt.belongsTo(Customer, {foreignKey: 'customer_id', as: 'customer'});
Customer.hasMany(Receipt, {foreignKey: 'customer_id'});
// Receipt <-> Receipt Detail
Receipt.ReceiptDetail = Receipt.hasMany(ReceiptDetail, {foreignKey: 'receipt_id', as: 'details'});
ReceiptDetail.belongsTo(Receipt, {foreignKey: 'receipt_id'});

export default Receipt;
