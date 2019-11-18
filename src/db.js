import Sequelize from "sequelize";
import dbConfig from "./config/db"

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
        underscored: true,
    }
});

export default sequelize;

export async function init() {
    try {
        await sequelize.authenticate();
        console.log('>>> Connected to database.');
    } catch (e) {
        console.error('Can\'t connect to database: ', e);
    }
}
