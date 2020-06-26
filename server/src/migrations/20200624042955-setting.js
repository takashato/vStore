'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('setting', {
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
                type: Sequelize.INTEGER(11),
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('setting');
    }
};
