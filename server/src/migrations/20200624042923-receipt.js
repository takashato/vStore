'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('receipt', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            type: {
                type: Sequelize.INTEGER(1),
                allowNull: false
            },
            source: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            staff_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            customer_id: {
                type: Sequelize.INTEGER(11),
                allowNull: true
            },
            total: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            total_money: {
                type: "DOUBLE",
                allowNull: true
            },
            total_amount: {
                type: "DOUBLE",
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
        return queryInterface.dropTable('receipt');
    }
};
