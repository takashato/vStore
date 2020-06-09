import ProductCategory from "../../models/product_category_imported";
import {createConnectionResolver, createNodeInterface, resolver} from "graphql-sequelize";
import Product from "../../models/product_imported";
import Customer from "../../models/customer_imported";
import sequelize from "../../db";

const { nodeField, nodeTypeMapper } = createNodeInterface(sequelize);

const productCategoryResolver = resolver(ProductCategory);
const productResolver = resolver(Product);
const customerResolver = resolver(Customer);

const Query = {
    node: nodeField.resolve,

    category: productCategoryResolver,
    categories: createConnectionResolver({
        target: ProductCategory,
    }).resolveConnection,

    product: productResolver,
    products: productResolver,

    customer: customerResolver,
    customers: createConnectionResolver({
        target: Customer,
    }).resolveConnection,
};

export default Query;
