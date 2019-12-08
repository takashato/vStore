import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

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

    let token = JWT.sign({id: staff.id}, secureConfig.jwtSecret, {expiresIn: '30d'});
    return {
        id: staff.id,
        token: token,
    };
}

const casualStaffExportFields = ['id', 'username', 'full_name', 'email', 'group_id', 'created_at', 'updated_at'];

export async function getAllStaff(request, h) {
    let params = request.query;

    let results = params.results;
    if (!results) results = 10;
    let page = params.page;
    if (!page) page = 1;
    let fields = params.fields;
    let fieldList = fields ? fields.split(',') : [];

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualStaffExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let staffs = await Staff.findAll({
        attributes: fieldList,
        limit: parseInt(results),
        offset: (page - 1) * results,
    });
    let count = await Staff.count();
    return {
        rows: staffs,
        total: count,
    };
}