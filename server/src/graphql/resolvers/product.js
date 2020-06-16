import {resolver} from "graphql-sequelize";
import Product from "../../models/product_imported";


const ProductResolver = {
    category: resolver(Product.Category),
    staff: resolver(Product.Staff),
};

export default ProductResolver;
