import sequelize from "../db";
import Product from "./product_imported";

const ReceiptDetail = sequelize.import(__dirname + '/receipt_detail');
ReceiptDetail.Product = ReceiptDetail.belongsTo(Product, {foreignKey: 'product_id', as: 'product'});
Product.hasMany(ReceiptDetail, {foreignKey: 'product_id'});

export default ReceiptDetail;
