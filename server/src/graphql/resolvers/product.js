import {resolver} from "graphql-sequelize";
import Product from "../../models/product_imported";

const productAndProductCategoryResolver =  resolver(Product.Category);

const ProductResolver = {
    category: productAndProductCategoryResolver,
};

export default ProductResolver;
