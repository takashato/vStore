'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('product', {
            id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            bar_code: {
                type: Sequelize.STRING(32),
                allowNull: false
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            category_id: {
                type: Sequelize.INTEGER(11),
                allowNull: false,
                references: {
                    model: 'product_category',
                    key: 'id'
                }
            },
            price: {
                type: "DOUBLE",
                allowNull: true
            },
            original_price: {
                type: "DOUBLE",
                allowNull: true
            },
            inventory_quantity: {
                type: "DOUBLE",
                allowNull: false
            },
            added_by: {
                type: Sequelize.INTEGER(11),
                allowNull: true
            },
            is_deleted: {
                type: Sequelize.INTEGER(4),
                allowNull: false,
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
        return queryInterface.dropTable('product');
    }
};
