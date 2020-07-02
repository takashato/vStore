import Sequelize from "sequelize";
import sequelize from "../db";
import StaffGroup from "./staff_group";
import Permission from "./permission";

const StaffGroupPermission = sequelize.define('staff_group_permission', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    group_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: '0',
    },
    created_at: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updated_at: {
        allowNull: false,
        type: Sequelize.DATE
    },
}, {
    tableName: 'staff_group_permission',
});

StaffGroupPermission.StaffGroup = StaffGroupPermission.belongsTo(StaffGroup, {foreignKey: 'group_id', as: 'group'});
StaffGroup.hasMany(StaffGroupPermission, {foreignKey: 'group_id'});

StaffGroupPermission.Permission = StaffGroupPermission.belongsTo(Permission, {foreignKey: 'key', as: 'permission'});
Permission.hasMany(StaffGroupPermission, {foreignKey: 'key'});

export default StaffGroupPermission;
