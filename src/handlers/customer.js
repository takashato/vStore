import ResponseBuilder from "../helpers/response_builder";
import Sequelize, {Op} from "sequelize";
import Customer from "../models/customer_imported";

const casualCustomerExportFields = ['id', 'full_name', 'phone_number', 'birthday', 'created_at', 'updated_at'];

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
            username: {
                [Op.like]: '%' + search + '%',
            }
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