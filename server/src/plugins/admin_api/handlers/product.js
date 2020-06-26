import ResponseBuilder from "../../../helpers/response_builder";
import Product from "../../../models/product";
import Sequelize, {Op} from "sequelize";
import ProductCategory from "../../../models/product_category";

const casualProductExportFields = [
    'id',
    'bar_code',
    'name',
    'category_id',
    'category',
    'added_by',
    'price',
    'original_price',
    'inventory_quantity',
    'created_at',
    'updated_at'
];
const editableProductFields = ['bar_code', 'name', 'category_id', 'price', 'original_price', 'is_deleted'];

export async function getAllProducts(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');
    let search = query.search;

    let category_id = query.category_id;
    let inventory = query.inventory;

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
            [Op.or]: [
                {
                    name: {
                        [Op.like]: '%' + search + '%',
                    }
                }, {
                    bar_code: {
                        [Op.like]: '%' + search + '%',
                    }
                }
            ]

        };
    }
    if (category_id) {
        options.where = {...options.where, category_id: category_id};
    }
    if (inventory) {
        options.where = {...options.where, inventory_quantity: {[Op.lte]: 0}};
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

export async function addProduct(request, h) {
    const payload = request.payload;

    if (!payload.bar_code || !payload.name || !payload.category_id || !payload.price) {
        return ResponseBuilder.inputError(h, 'Vui lòng không bỏ trống những ô có dấu (*)', 'missing_required_fields');
    }
    if (await Product.findOne({where: {bar_code: payload.bar_code}})) {
        return ResponseBuilder.inputError(h, 'Bar code (' + payload.bar_code + ') đã tồn tại trên hệ thống.', 'bar_code_found.');
    }
    if (!await ProductCategory.findByPk(payload.category_id)) {
        return ResponseBuilder.inputError(h, 'Danh mục không tồn tại.', 'category_not_found');
    }
    const price = parseFloat(payload.price);
    if (isNaN(price)) {
        return ResponseBuilder.inputError(h, 'Giá tiền không hợp lệ.', 'invalid_price');
    }
    let original_price;
    if (payload.original_price) {
        original_price = parseFloat(payload.original_price);
        if (isNaN(original_price)) {
            return ResponseBuilder.inputError(h, 'Giá tiền không hợp lệ.', 'invalid_original_price');
        }
    }

    const product = Product.build({
        bar_code: payload.bar_code,
        name: payload.name,
        category_id: payload.category_id,
        price: price,
        original_price: original_price,
        added_by: request.staff.id,
        inventory_quantity: 0,
        is_deleted: 0,
    });
    try {
        if (await product.save()) {
            return {created_id: product.id};
        }
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi không xác định.', 'unknown_errror');
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi thêm sản phẩm.', 'error_on_create', err);
    }
}

export async function getProduct(request, h) {
    let id = request.params.id;

    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id', 'name'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualProductExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    let options = {};
    if (fieldList.includes('category')) {
        options.include = [{
            model: ProductCategory,
            as: 'category',
            attributes: ['id', 'name'],
        }];
        fieldList.splice(fieldList.indexOf('category'), 1);
    }


    let product;
    try {
        product = await Product.findByPk(id, {attributes: fieldList, ...options});
    } catch (err) {
        console.log(err);
    }
    if (!product) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Sản phẩm không tồn tại.', 'product_not_found');
    }
    return product;
}

export async function updateProduct(request, h) {
    let id = request.params.id;
    let payload = request.payload;

    let fieldList = Object.keys(payload);

    if (fieldList.length < 1 || !payload.name) {
        return ResponseBuilder.inputError(h, 'Payload trống.', 'empty_payload');
    }

    let product = await Product.findByPk(id);
    if (!product) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Sản phẩm không tồn tại.', 'product_not_found');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        let field = fieldList[i];
        if (editableProductFields.includes(field)) {
            if (field === "bar_code" && payload.bar_code !== product.bar_code) {
                if (await Product.findOne({where: {bar_code: payload.bar_code}})) {
                    return ResponseBuilder.inputError(h, 'Bar code (' + payload.bar_code + ') đã tồn tại trên hệ thống.', 'bar_code_found.');
                }
            }
            product[field] = payload[field];
        }
    }

    try {
        if (await product.save()) {
            return {id: product.id};
        }
    } catch (err) {
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Lỗi khi cập nhật sản phẩm.', 'error_on_update', err);
    }
}
