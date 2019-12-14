import sequelize from "../db";

const Product = sequelize.import(__dirname + "/product");

export default Product;