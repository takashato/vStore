import sequelize from "../db";

const ReceiptDetail = sequelize.import(__dirname + '/receipt_detail');

export default ReceiptDetail;