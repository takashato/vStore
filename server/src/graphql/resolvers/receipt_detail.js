import {resolver} from "graphql-sequelize";
import ReceiptDetail from "../../models/receipt_detail_imported";

const ReceiptDetailResolver = {
    product: resolver(ReceiptDetail.Product)
};

export default ReceiptDetailResolver;
