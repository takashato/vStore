import sequelize from "../db";
import Staff from "./staff_imported";
import Customer from "./customer_imported";
import ReceiptDetail from "./receipt_detail_imported";

const Receipt = sequelize.import(__dirname + '/receipt');
// Receipt <-> Staff
Receipt.belongsTo(Staff, {foreignKey: 'staff_id', as: 'staff'});
Staff.hasMany(Receipt, {foreignKey: 'staff_id'});
// Receipt <-> Customer
Receipt.belongsTo(Customer, {foreignKey: 'customer_id', as: 'customer'});
Customer.hasMany(Receipt, {foreignKey: 'customer_id'});
// Receipt <-> Receipt Detail
Receipt.hasMany(ReceiptDetail, {foreignKey: 'receipt_id', as: 'details'});
ReceiptDetail.belongsTo(Receipt, {foreignKey: 'receipt_id'});

export default Receipt;