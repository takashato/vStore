import sequelize from "../db";

const Permission = sequelize.define('permission', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    key: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    default_value: {
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
    tableName: 'permission',
});

export default Permission;
