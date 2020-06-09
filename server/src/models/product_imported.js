import sequelize from "../db";
import ProductCategory from "./product_category_imported";
import Staff from "./staff_imported";

const Product = sequelize.import(__dirname + "/product");

Product.Category = Product.belongsTo(ProductCategory, {foreignKey: 'category_id', as: 'category'});
ProductCategory.hasMany(Product, {foreignKey: 'category_id'});

Product.Staff = Product.belongsTo(Staff, {foreignKey: 'added_by', as: 'staff'});
Staff.hasMany(Product, {foreignKey: 'added_by'});

export default Product;
