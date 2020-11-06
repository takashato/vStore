import StaffGroupPermission from "../../../models/staff_group_permission";
import Permission from "../../../models/permission";
import ResponseBuilder from "../../../helpers/response_builder";
import StaffGroup from "../../../models/staff_group";

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

export async function getGroups(request, h) {
    try {
        const groups = await StaffGroup.findAll();
        return groups;
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể lấy danh sách nhóm thành viên.');
    }
}

export async function getGroup(request, h) {
    const {params} = request;
    const id = params.id;

    if (!id) {
        return ResponseBuilder.error(h, ResponseBuilder.BAD_REQUEST, "Thiếu tham số ID");
    }

    const group = await StaffGroup.findByPk(id);
    if (!group) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, "Nhóm thành viên không tồn tại");
    }
    try {
        const permissions = await Permission.findAll();
        const userPermissions = await StaffGroupPermission.findAll({
            where: {
                group_id: id,
            }
        });
        const returnObj = {};
        for (const permission of permissions) {
            returnObj[permission.key] = {
                name: permission.name,
                value: permission.default_value == 1
            };
        }
        for(const userPermission of userPermissions) {
            if (!returnObj.hasOwnProperty(userPermission.key)) {
                returnObj[userPermission.key] = {
                    name: userPermission.key,
                };
            }
            returnObj[userPermission.key].value = userPermission.value == 1;
        }
        return returnObj;
    } catch (err) {
        console.log(err);
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Lỗi khi lấy thông tin phân quyền.")
    }
}
