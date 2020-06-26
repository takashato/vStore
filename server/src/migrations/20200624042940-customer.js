'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('customer', {
            id: {
                type: Sequelize.INTEGER(11),
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('customer');
    }
};
