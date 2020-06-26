import Staff from "../../models/staff";
import ResponseBuilder from "../../helpers/response_builder";
import Bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import secureConfig from "../../config/secure.json";
import {UserInputError} from "apollo-server-errors";

export const authenticate = async (obj, args, context, info) => {
    const {username, password} = args.auth;

    let staff = await Staff.findOne({where: {username: username}});
    if (!staff) {
        throw new UserInputError("Tài khoản không tồn tại", {field: 'username', error: 'staff_not_found'});
    }
    if (staff.password.length < 50) {
        staff.password = await Bcrypt.hash(staff.password, await Bcrypt.genSalt());
        staff.save();
    }
    if (!(await Bcrypt.compare(password, staff.password))) {
        throw new UserInputError("Mật khẩu không đúng", {field: 'password', error: 'incorrect_password'})
    }
    if (staff.active !== 1) {
        throw new UserInputError("Tài khoản hiện đang bị khóa", {field: 'username', error: 'account_locked'});
    }

    let token = JWT.sign({
        id: staff.id,
        hash: staff.password,
    }, secureConfig.jwtSecret, {expiresIn: '30d'});

    return {
        id: staff.id,
        token: token,
    };
};

const AuthResolver = {
};

export default AuthResolver;
