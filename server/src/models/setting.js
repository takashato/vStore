import Sequelize from "sequelize";
import sequelize from "../db";
import SettingGroup from "./setting_group";

const Setting = sequelize.define('setting', {
    varname: {
        type: Sequelize.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    default_value: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    name: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    formatter: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    tableName: 'setting'
});

Setting.belongsTo(SettingGroup, {foreignKey: 'group_id', as: 'group'});
SettingGroup.hasMany(Setting, {foreignKey: 'group_id'});

export default Setting;
