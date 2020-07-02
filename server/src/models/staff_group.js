import Sequelize from "sequelize";
import sequelize from "../db";

const StaffGroup = sequelize.define('staff_group', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    tableName: 'staff_group',
});

export default StaffGroup;
