import {resolver} from "graphql-sequelize";
import Product from "../../models/product";


const ProductResolver = {
    category: resolver(Product.Category),
    staff: resolver(Product.Staff),
};

export default ProductResolver;
