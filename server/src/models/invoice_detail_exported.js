import sequelize from "../db";
import Product from "./product_imported";

const InvoiceDetail = sequelize.import(__dirname + '/invoice_detail');

InvoiceDetail.belongsTo(Product, {foreignKey: 'product_id', as: 'product'});
Product.hasMany(InvoiceDetail, {foreignKey: 'product_id'});

export default InvoiceDetail;