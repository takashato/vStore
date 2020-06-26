import ProductCategory from "../../models/product_category";
import {createConnectionResolver, createNodeInterface, resolver} from "graphql-sequelize";
import Product from "../../models/product";
import Customer from "../../models/customer";
import sequelize from "../../db";
import Staff from "../../models/staff";
import Receipt from "../../models/receipt";
import ReceiptDetail from "../../models/receipt_detail";
import {authenticate} from "./auth";
import resolverForOffsetPagination from "../../helpers/graphql_offset_pagination";

const {nodeField} = createNodeInterface(sequelize);

const Query = {
    node: nodeField.resolve,

    authenticate: authenticate,

    category: resolver(ProductCategory),
    categories: createConnectionResolver({
        target: ProductCategory,
    }).resolveConnection,

    product: resolver(Product),
    products: createConnectionResolver({
        target: Product,
    }).resolveConnection,

    customer: resolver(Customer),
    customers: createConnectionResolver({
        target: Customer,
    }).resolveConnection,

    staff: resolver(Staff),
    staffs: createConnectionResolver({
        target: Staff,
    }).resolveConnection,
    staffs_offset: resolverForOffsetPagination(Staff),

    receipt: resolver(Receipt),
    receipts: createConnectionResolver({
        target: Receipt,
    }).resolveConnection,

    receiptDetails: createConnectionResolver({
        target: ReceiptDetail,
    }).resolveConnection
};

export default Query;
