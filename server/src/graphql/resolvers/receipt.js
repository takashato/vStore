import {createConnectionResolver, resolver} from "graphql-sequelize";
import Receipt from "../../models/receipt_imported";

const ReceiptResolver = {
    staff: resolver(Receipt.Staff),
    customer: resolver(Receipt.Customer),
    details_with_pagination: createConnectionResolver({
        target: Receipt.ReceiptDetail,
    }).resolveConnection,
    details: resolver(Receipt.ReceiptDetail),
};

export default ReceiptResolver;
