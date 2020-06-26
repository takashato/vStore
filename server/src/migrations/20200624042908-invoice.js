'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('invoice', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            customer_id: {
                type: Sequelize.INTEGER(11),
                allowNull: true
            },
            staff_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false
            },
            prepaid_value: {
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
            pay_method: {
                type: Sequelize.INTEGER(11),
                allowNull: true,
                defaultValue: '0'
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
        return queryInterface.dropTable('invoice');
    }
};
