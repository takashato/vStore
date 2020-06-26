import Sequelize from "sequelize";
import sequelize from "../db";

const Staff = sequelize.define('staff', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    full_name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    active: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '1'
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
    tableName: 'staff'
});

export default Staff;
