import Sequelize from "sequelize";
import sequelize from "../db";

const Customer = sequelize.define('customer', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    full_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    phone_number: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    birthday: {
        type: Sequelize.DATEONLY,
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
    tableName: 'customer'
});

export default Customer;
