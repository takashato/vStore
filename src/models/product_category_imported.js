import sequelize from "../db";

const ProductCategory = sequelize.import(__dirname + "/product_category");

export default ProductCategory;