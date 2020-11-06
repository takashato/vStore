import StaffGroupPermission from "../../../models/staff_group_permission";
import Permission from "../../../models/permission";
import ResponseBuilder from "../../../helpers/response_builder";

export async function getUserPermission(request, h) {
    const {query} = request;

    const returnObj = {};

    try {
        const permissions = await Permission.findAll();
        for (const permission of permissions) {
            const userPermission = await StaffGroupPermission.findOne({
                where: {
                    group_id: request.staff.group_id,
                    key: permission.key,
                }
            });
            returnObj[permission.key] = userPermission ? userPermission.value == 1 : permission.default_value == 1;
        }
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể lấy thông tin phân quyền.');
    }

    returnObj['_default'] = true;
    return returnObj;
}
