import sequelize from "../db";

const Invoice = sequelize.import(__dirname + '/invoice');

export default Invoice;