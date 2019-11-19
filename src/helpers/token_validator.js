import Staff from '../models/staff_imported';

const validate = async function (decoded, request, h) {
    // do your checks to see if the person is valid
    let staff = Staff.findOne(decoded.id);
    if (!staff) {
        return { isValid: false };
    }
    else {
        return { isValid: true };
    }
};

export default validate;