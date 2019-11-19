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

    let token = JWT.sign({id: staff.id}, secureConfig.jwtSecret);
    return {
        id: staff.id,
        token: token,
    };
}