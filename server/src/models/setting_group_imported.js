import sequelize from "../db";

const SettingGroup = sequelize.import(__dirname + "/setting_group");

export default SettingGroup;