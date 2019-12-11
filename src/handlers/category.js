import ResponseBuilder from "../helpers/response_builder";
import ProductCategory from "../models/product_category_imported";

const casualStaffExportFields = ['id', 'name', 'created_at', 'updated_at'];

export async function getAllCategories(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualStaffExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let categories = await ProductCategory.findAll({
        attributes: fieldList,
        limit: parseInt(results),
        offset: (page - 1) * results,
    });
    let count = await ProductCategory.count();
    return {
        rows: categories,
        total: count,
    };
}