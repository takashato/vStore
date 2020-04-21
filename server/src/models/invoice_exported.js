import sequelize from "../db";
import Staff from "./staff_imported";
import Customer from "./customer_imported";
import InvoiceDetail from "./invoice_detail_exported";

const Invoice = sequelize.import(__dirname + '/invoice');

//Invoice <-> Staff
Invoice.belongsTo(Staff, {foreignKey: 'staff_id', as: 'staff'});
Staff.hasMany(Invoice, {foreignKey: 'staff_id'});

//Invoice <-> Customer
Invoice.belongsTo(Customer, {foreignKey: 'customer_id', as: 'customer'});
Customer.hasMany(Invoice, {foreignKey: 'customer_id'});

//Invoice <-> InvoiceDetail
Invoice.hasMany(InvoiceDetail, {foreignKey: 'invoice_id', as: 'details'});
InvoiceDetail.belongsTo(Invoice, {foreignKey: 'invoice_id'});

export default Invoice;