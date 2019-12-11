import ResponseBuilder from "../helpers/response_builder";
import ProductCategory from "../models/product_category_imported";
import {Op} from "sequelize";
import Staff from "../models/staff_imported";
import Bcrypt from "bcrypt";

const casualCategoryExportFields = ['id', 'name', 'created_at', 'updated_at'];

export async function getAllCategories(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');
    let search = query.search;


    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualCategoryExportFields.includes(fieldList[i])) {
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

    let categories = await ProductCategory.findAll({
        attributes: fieldList,
        limit: parseInt(results),
        offset: (page - 1) * results,
        ...options
    });
    let count = await ProductCategory.count();
    return {
        rows: categories,
        total: count,
    };
}

export async function getCategory(request, h) {
    let id = request.params.id;
    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }
    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualCategoryExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }
    let category;
    try {
        category = await ProductCategory.findByPk(id, {attributes: fieldList});
    } catch (err) {
        console.log(err);
    }
    if (!category) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Danh mục không tồn tại.', 'category_not_found');
    }
    return category;
}

export async function createCategory(request, h) {
    let name = request.payload.name;

    if (!name) {
        return ResponseBuilder.inputError(h, 'Yêu cầu giá trị tên.', 'require_name_field');
    }

    const category = ProductCategory.build({name: name});

    try {
        if (await category.save()) {
            return {created_id: category.id};
        }
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi không xác định.', 'unknown_errror');
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi tạo danh mục.', 'error_on_create', err);
    }
}

export async function updateCategory(request, h) {
    let id = request.params.id;
    let payload = request.payload;

    if (payload.length < 1 || !payload.name) {
        return ResponseBuilder.inputError(h, 'Payload trống.', 'empty_payload');
    }

    let category = await ProductCategory.findByPk(id);
    if (!category) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Danh mục không tồn tại.', 'category_not_found');
    }
    category.name = payload.name;
    try {
        if (await category.save()) {
            return {id: category.id};
        }
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi cập nhật danh mục.', 'error_on_update', err);
    }
}