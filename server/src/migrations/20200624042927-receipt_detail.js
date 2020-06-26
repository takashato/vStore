'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('receipt_detail', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            receipt_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            product_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            price: {
                type: "DOUBLE",
                allowNull: true
            },
            amount: {
                type: "DOUBLE",
                allowNull: true
            },
            total_money: {
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
        return queryInterface.dropTable('receipt_detail');
    }
};
