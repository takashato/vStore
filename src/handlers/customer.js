import ResponseBuilder from "../helpers/response_builder";
import Sequelize, {Op} from "sequelize";
import Customer from "../models/customer_imported";
import Staff from "../models/staff_imported";

const casualCustomerExportFields = ['id', 'full_name', 'phone_number', 'birthday', 'created_at', 'updated_at'];
const editableCustomerFields = ['full_name', 'phone_number', 'birthday'];
const regEx = /^0[35789][0-9]{8}$/;
const currentYear =  new Date().getFullYear();

export async function getAllCustomers(request, h) {
    let params = request.query;

    let results = params.results || 10;
    let page = params.page || 1;
    let fields = params.fields;
    let fieldList = fields ? fields.split(',') : ['id'];
    let search = params.search;

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualCustomerExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let options = {};
    if (search) {
        options.where = {
            [Op.or]: [
                {
                    full_name: {
                        [Op.like]: '%' + search + '%',
                    }
                }, {
                    phone_number: {
                        [Op.like]: '%' + search + '%',
                    }
                }
            ]
        };
    }

    let customers = await Customer.findAll({
        attributes: fieldList,
        limit: parseInt(results),
        offset: (page - 1) * results,
        ...options
    });
    let count = await Customer.count();
    return {
        rows: customers,
        total: count,
    };
}

export async function getCustomer(request, h) {
    let id = request.params.id;
    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }
    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualCustomerExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }
    let customer;
    try {
        customer = await Customer.findByPk(id, {attributes: fieldList});
    } catch (err) {
        console.log(err);
    }
    if (!customer) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Khách hàng không tồn tại.', 'customer_not_found');
    }
    return customer;
}

export async function createCustomer(request, h) {
    let payload = request.payload;

    let full_name = payload.full_name;
    let phone_number = payload.phone_number;
    let birthday = payload.birthday;

    let year = new Date(payload.birthday).getFullYear();

    if (!full_name || !phone_number) {
        return ResponseBuilder.inputError(h, 'Vui lòng không bỏ trống những ô có dấu (*)', 'missing_required_fields');
    }
    if (await Customer.findOne({where: {phone_number: phone_number}})) {
        return ResponseBuilder.inputError(h, 'Khách hàng đã tồn tại.', 'username_is_not_available');
    }
    if (phone_number.length !== 10 || !regEx.test(phone_number)) {
        return ResponseBuilder.inputError(h, 'Số điện thoại không hợp lệ.', 'phone_number_is_invalid');
    }
    if (birthday && (currentYear - year < 18)) {
        return ResponseBuilder.inputError(h, 'Khách hàng không đủ tuổi.', 'customer_is_too_young');
    }

    let customer = Customer.build({
        full_name: full_name,
        phone_number: phone_number,
        birthday: birthday,
    });
    try {
        if (await customer.save()) {
            return {created_id: customer.id};
        }
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi không xác định.', 'unknown_errror');
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi tạo khách hàng.', 'error_on_create', err);
    }
}

export async function updateCustomer(request, h) {
    let id = request.params.id;
    let payload = request.payload;

    let fieldList = Object.keys(payload);

    if (fieldList.length < 1) {
        return ResponseBuilder.inputError(h, 'Payload trống.', 'empty_payload');
    }

    let customer = await Customer.findByPk(id);
    if (!customer) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Khách hàng không tồn tại.', 'customer_not_found');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        let field = fieldList[i];
        if (editableCustomerFields.includes(field)) {
            if (field === 'phone_number' && (payload.phone_number.length !== 10 || !regEx.test(payload.phone_number))) {
                return ResponseBuilder.inputError(h, 'Số điện thoại không hợp lệ.', 'phone_number_is_invalid');
            }
            if (field === 'birthday') {
                let year = new Date(payload.birthday).getFullYear();
                if (payload.birthday && (currentYear - year < 18)) {
                    return ResponseBuilder.inputError(h, 'Khách hàng không đủ tuổi.', 'customer_is_too_young');
                }
            }
            customer[field] = payload[field];
        }
    }
    try {
        if (await customer.save()) {
            return {id: customer.id};
        }
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi cập nhật khách hàng.', 'error_on_update', err);
    }
}