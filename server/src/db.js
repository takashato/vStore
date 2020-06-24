import Sequelize from "sequelize";
import dbConfigs from "./config/db"

const dbConfig = dbConfigs[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
        underscored: true,
    },
    timezone: dbConfig.timezone,
});

export default sequelize;

export async function init() {
    try {
        await sequelize.authenticate();
        console.log(`>>> Connected to database using "${process.env.NODE_ENV || "development"}".`);
    } catch (e) {
        console.error('Can\'t connect to database: ', e);
        process.exit();
    }
}
