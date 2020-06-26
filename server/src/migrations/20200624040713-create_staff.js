'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('staff', {
            id: {
                type: Sequelize.INTEGER(11),
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
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            active: {
                type: Sequelize.INTEGER(1),
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('staff');
    }
};
