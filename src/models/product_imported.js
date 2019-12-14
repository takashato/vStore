import sequelize from "../db";
import ProductCategory from "./product_category_imported";

const Product = sequelize.import(__dirname + "/product");
Product.belongsTo(ProductCategory, {foreignKey: 'category_id', as: 'category'});
ProductCategory.hasMany(Product, {foreignKey: 'category_id'});

export default Product;