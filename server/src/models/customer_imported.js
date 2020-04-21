import sequelize from "../db";

const Customer = sequelize.import(__dirname + "/customer");

export default Customer;
