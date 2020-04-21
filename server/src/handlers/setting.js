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
            attributes: ['id', 'name', 'varname', 'description', 'index'],
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

export async function getAllSettings(request, h) {
    let varname = request.params.varname;

    const query = request.query;

    let groupId = query.groupId;

    try {
        let groups = await SettingGroup.findAll({
            where: {
                varname: varname
            }
        });

        if(groups && groups.length > 0) {
            let settings = await Setting.findAll({
                attributes: ['varname', 'value', 'default_value', 'name', 'description', 'formatter'],
                where: {
                    group_id: groupId
                }
            });
            return {
                settings: settings,
            };
        }
        else {
            return ResponseBuilder.inputError(h, 'Không tồn tại varname.', 'require_varname_field');
        }

    } catch (err) {
        console.log(err);
        return h.code(500);
    }
}