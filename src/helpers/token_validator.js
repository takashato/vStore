import Staff from '../models/staff_imported';

const validate = async function (decoded, request, h) {
    // do your checks to see if the person is valid
    let staff = null;
    try {
        staff = await Staff.findByPk(decoded.id);
    } catch (err) {
        console.log(err);
        return {isValid: false};
    }
    if (!staff || decoded.hash !== staff.password) {
        return {isValid: false};
    }
    request.staff = staff;
    if (request.route.settings.app.allowedGroups && !request.route.settings.app.allowedGroups.includes(staff.group_id)) { // Require group check
        const response = h.response({statusCode: 403, userMessage: 'Bạn không được phép truy cập vào nội dung này.'}).code(403);
        return {isValid: false, response};
    }
    return {isValid: true};
};

export default validate;