'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('staff_group_permission', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            group_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
            },
            key: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            value: {
                type: Sequelize.INTEGER(1),
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('staff_group_permission');
    }
};
