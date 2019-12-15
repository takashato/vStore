import sequelize from "../db";

const InvoiceDetail = sequelize.import(__dirname + '/invoice_detail');

export default InvoiceDetail;