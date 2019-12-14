import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import {Op} from "sequelize";

import secureConfig from "../config/secure";
import Staff from "../models/staff_imported";
import ResponseBuilder from "../helpers/response_builder";

export async function authenticate(request, h) {
    let payload = request.payload;

    let username = payload.username;
    let password = payload.password;

    if (!username || !password) {
        return ResponseBuilder.inputError(h, 'Vui lòng nhập tên tài khoản / mật khẩu', 'missing_username_password');
    }

    let staff = await Staff.findOne({where: {username: username}});
    if (!staff) {
        return ResponseBuilder.inputError(h, "Tài khoản không tồn tại", 'staff_not_found');
    }
    if (staff.password.length < 50) {
        staff.password = await Bcrypt.hash(staff.password, await Bcrypt.genSalt());
        staff.save();
    }
    if (!(await Bcrypt.compare(password, staff.password))) {
        return ResponseBuilder.inputError(h, "Mật khẩu không đúng", 'incorrect_password');
    }

    let token = JWT.sign({
        id: staff.id,
        hash: staff.password,
    }, secureConfig.jwtSecret, {expiresIn: '30d'});
    return {
        id: staff.id,
        token: token,
    };
}

const casualStaffExportFields = ['id', 'username', 'full_name', 'email', 'group_id', 'created_at', 'updated_at', 'active'];
const editableStaffFields = ['full_name', 'email', 'group_id', 'password', 'active'];

export async function getAllStaff(request, h) {
    let params = request.query;

    let results = params.results || 10;
    let page = params.page || 1;
    let fields = params.fields;
    let fieldList = fields ? fields.split(',') : ['id'];
    let search = params.search;

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualStaffExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let options = {};
    if (search) {
        options.where = {
            username: {
                [Op.like]: '%' + search + '%',
            }
        };
    }

    let staffs = await Staff.findAll({
        attributes: fieldList,
        limit: parseInt(results),
        offset: (page - 1) * results,
        ...options
    });
    let count = await Staff.count();
    return {
        rows: staffs,
        total: count,
    };
}

export async function getStaff(request, h) {
    let id = request.params.id;
    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }
    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualStaffExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }
    let staff;
    try {
        staff = await Staff.findByPk(id, {attributes: fieldList});
    } catch (err) {
        console.log(err);
    }
    if (!staff) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Nhân viên không tồn tại.', 'staff_not_found');
    }
    return staff;
}

export async function createStaff(request, h) {
    let payload = request.payload;

    let username = payload.username;
    let password = payload.password;
    let full_name = payload.full_name;
    let email = payload.email;
    let group_id = payload.group_id;

    if (!username || !password || !full_name || !group_id) {
        return ResponseBuilder.inputError(h, 'Vui lòng không bỏ trống những ô có dấu (*)', 'missing_required_fields');
    }
    if (await Staff.findOne({where: {username: username}})) {
        return ResponseBuilder.inputError(h, 'Tên tài khoản đã tồn tại.', 'username_is_not_available');
    }
    if (password.length < 5) {
        return ResponseBuilder.inputError(h, 'Mật khẩu phải dài từ 5 ký tự trở lên.', 'password_is_too_short');
    }
    if (group_id < 1 || group_id > 3) {
        return ResponseBuilder.inputError(h, 'Giá trị nhóm quyền không hợp lệ.', 'group_id_is_invalid');
    }

    let staff = Staff.build({
        username: username,
        password: Bcrypt.hashSync(password, Bcrypt.genSaltSync()),
        email: email,
        full_name: full_name,
        group_id: group_id,
    });
    try {
        if (await staff.save()) {
            return {created_id: staff.id};
        }
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi không xác định.', 'unknown_errror');
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi tạo nhân viên.', 'error_on_create', err);
    }
}

export async function updateStaff(request, h) {
    let id = request.params.id;
    let payload = request.payload;

    let fieldList = Object.keys(payload);

    if (fieldList.length < 1) {
        return ResponseBuilder.inputError(h, 'Payload trống.', 'empty_payload');
    }

    let staff = await Staff.findByPk(id);
    if (!staff) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Nhân viên không tồn tại.', 'staff_not_found');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        let field = fieldList[i];
        if (editableStaffFields.includes(field)) {
            if (field === 'group_id' && (payload.group_id < 1 || payload.group_id > 3)) {
                return ResponseBuilder.inputError(h, 'Giá trị nhóm quyền không hợp lệ.', 'group_id_is_invalid');
            }
            if (field === 'password') {
                if (payload.password < 5) {
                    return ResponseBuilder.inputError(h, 'Mật khẩu phải dài từ 5 ký tự trở lên.', 'password_is_too_short');
                }
                staff.password = Bcrypt.hashSync(payload.password, Bcrypt.genSaltSync());
                continue;
            }
            staff[field] = payload[field];
        }
    }
    try {
        if (await staff.save()) {
            return {id: staff.id};
        }
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi cập nhật nhân viên.', 'error_on_update', err);
    }
}