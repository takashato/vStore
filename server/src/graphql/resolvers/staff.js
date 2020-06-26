import {UserInputError} from "apollo-server-errors";
import Bcrypt from "bcrypt";
import Staff from "../../models/staff";
import isValidPassword from "../../helpers/password_validator";
import {resolver} from "graphql-sequelize";

export const staffMutationResolver = async (parents, {staff: input}, context, info) => {
    if (!input) {
        throw new UserInputError("Vui lòng nhập đầy đủ thông tin", []);
    }

    const isCreate = !input.id;
    if ((isCreate && (!input.username || !input.password)) || !input.full_name || !input.group_id) {
        const errors = [];
        if (isCreate && !input.username) errors.push({field: "username"});
        if (isCreate && !input.password) errors.push({field: "password"});
        if (!input.full_name) errors.push({field: "full_name"});
        if (!input.group_id) errors.push({field: "group_id"});
        throw new UserInputError("Vui lòng không bỏ trống những trường có dấu (*)", {fieldErrors: errors});
    }

    let staff = null;
    if (isCreate) {
        staff = await Staff.build({});
        // Validate username
        if (Staff.count(input.username) > 0) {
            throw new UserInputError("Tên đăng nhập đã được sử dụng, vui lòng chọn tên khác.", {
                fieldErrors: [{
                    field: "username",
                    error: "username_is_not_available"
                }]
            });
        }
        staff.username = input.username;
    } else {
        staff = await Staff.findByPk(input.id);
        // Validate user
        if (!staff) {
            throw new UserInputError("Nhân viên không tồn tại trong hệ thống.", []);
        }
    }

    if ((isCreate || input.password) && !isValidPassword(input.password)) {
        throw new UserInputError("Mật khẩu phải từ 5 ký tự trở lên.", {
            fieldErrors: [{
                field: "password",
                error: "invalid_password"
            }]
        });
    }
    if (input.password) {
        staff.password = Bcrypt.hashSync(input.password, Bcrypt.genSaltSync());
    }
    staff.full_name = input.full_name;
    staff.email = input.email;
    if (input.group_id < 1 || input.group_id > 3) { // TODO handle staff group
        throw new UserInputError("Giá trị nhóm quyền không hợp lệ", {
            fieldErrors: [{
                field: "group_id",
                error: "group_id_is_invalid"
            }]
        });
    }
    staff.group_id = input.group_id;
    if (![0, 1].includes(input.active)) {
        throw new UserInputError("Giá trị kích hoạt tài khoản không hợp lệ", {
            fieldErrors: [{
                field: "active",
                error: "active_status_invalid"
            }]
        });
    }
    staff.active = input.active;
    if (!await staff.save()) {
        throw new Error("Không thể lưu thông tin nhân viên.");
    }
    return resolver(Staff)(parents, {id: staff.id}, context, info);
};
