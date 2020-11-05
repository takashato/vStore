import StaffGroupPermission from "../../../models/staff_group_permission";
import Permission from "../../../models/permission";

export async function getUserPermission(request, h) {
    const {query} = request;
    const permissionList = query.list ? query.list.split(',') : [];

    const returnObj = {};
    for (const permissionKey of permissionList) {
        const result = await Permission.findOne({
            where: {
                group_id: request.staff.group_id,
                key: permissionKey
            }
        });
        if (result) {
            returnObj[permissionKey] = result.value == 1;
            continue;
        }
        const defaultResult = await StaffGroupPermission.findOne({
            where: {
                group_id: request.staff.group_id,
                key: permissionKey
            }
        });
        returnObj[permissionKey] = defaultResult ? defaultResult.value == 1 : false;
    }
    return returnObj;
}
