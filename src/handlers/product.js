import ResponseBuilder from "../helpers/response_builder";
import Product from "../models/product_imported";
import Sequelize, {Op} from "sequelize";
import ProductCategory from "../models/product_category_imported";

const casualProductExportFields = ['id', 'bar_code', 'name', 'category_id', 'category', 'added_by', 'price', 'inventory_quantity', 'created_at', 'updated_at'];

export async function getAllProducts(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');
    let search = query.search;


    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualProductExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let options = {};
    if (search) {
        options.where = {
            name: {
                [Op.like]: '%' + search + '%',
            }
        };
    }

    if (fieldList.includes('category')) {
        options.include = [{
            model: ProductCategory,
            as: 'category',
            attributes: ['id', 'name'],
        }];
        fieldList.splice(fieldList.indexOf('category'), 1);
    }

    try {
        let products = await Product.findAll({
            attributes: fieldList,
            limit: parseInt(results),
            offset: (page - 1) * results,
            ...options
        });
        let count = await Product.count({
            ...options
        });
        return {
            rows: products,
            total: count,
        };
    } catch (err) {
        console.log(err);
        return h.code(500);
    }
}