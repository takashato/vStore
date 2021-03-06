import Sequelize from "sequelize";
import sequelize from "../db";

const SettingGroup = sequelize.define('setting_group', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    varname: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    active: {
        type: Sequelize.INTEGER(1),
        allowNull: false,
        defaultValue: '1'
    },
    index: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    tableName: 'setting_group'
});

export default SettingGroup;
