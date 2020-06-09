import ProductCategory from "../../models/product_category_imported";
import {resolver} from "graphql-sequelize";
import Product from "../../models/product_imported";

const productCategoryResolver = resolver(ProductCategory);
const productResolver = resolver(Product);

const Query = {
    category: productCategoryResolver,
    categories: productCategoryResolver,
    product: productResolver,
    products: productResolver,
};

export default Query;
