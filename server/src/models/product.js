import Sequelize from "sequelize";
import sequelize from "../db";
import ProductCategory from "./product_category";
import Staff from "./staff";

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
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
        type: Sequelize.INTEGER,
        allowNull: true
    },
    is_deleted: {
        type: Sequelize.INTEGER,
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
}, {
    tableName: 'product'
});

Product.Category = Product.belongsTo(ProductCategory, {foreignKey: 'category_id', as: 'category'});
ProductCategory.hasMany(Product, {foreignKey: 'category_id'});

Product.Staff = Product.belongsTo(Staff, {foreignKey: 'added_by', as: 'staff'});
Staff.hasMany(Product, {foreignKey: 'added_by'});

export default Product;
