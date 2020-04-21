import sequelize from "../db";
import SettingGroup from "./setting_group_imported";

const Setting = sequelize.import(__dirname + "/setting");
Setting.belongsTo(SettingGroup, {foreignKey: 'group_id', as: 'group'});
SettingGroup.hasMany(Setting, {foreignKey: 'group_id'});

export default Setting;