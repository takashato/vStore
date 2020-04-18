import ResponseBuilder from "../helpers/response_builder";
import Sequelize, {Op} from "sequelize";
import Setting from "../models/setting_imported";
import SettingGroup from "../models/setting_group_imported";
import Product from "../models/product_imported";

// const casualSettingExportFields = [
//     'varname',
//     'value',
//     'default_value',
//     'name',
//     'description',
//     'formatter',
//     'group_id',
//     'group',
//     'created_at',
//     'updated_at'
// ];
// const editableSettingFields = ['value', 'default_value', 'name', 'description', 'formatter', 'group_id'];

export async function getAllSettingGroups(request, h) {
    try {
        let settingGroups = await SettingGroup.findAll({
            attributes: ['id', 'name', 'description', 'index'],
            where: {
                active: 1
            },
            order: [['index', 'ASC']]
        });
        return {
            settingGroups: settingGroups,
        };
    } catch (err) {
        console.log(err);
        return h.code(500);
    }
}