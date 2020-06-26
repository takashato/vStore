'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('invoice_detail', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            invoice_id: {
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
            quantity: {
                type: "DOUBLE",
                allowNull: true
            },
            total_value: {
                type: "DOUBLE",
                allowNull: true
            },
            discount_value: {
                type: "DOUBLE",
                allowNull: true
            },
            total_final_value: {
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
        return queryInterface
    }
};
