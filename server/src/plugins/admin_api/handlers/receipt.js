import ResponseBuilder from "../../../helpers/response_builder";
import Staff from "../../../models/staff";
import Customer from "../../../models/customer";
import Receipt from "../../../models/receipt";
import Product from "../../../models/product";
import sequelize from "../../../db";
import ReceiptDetail from "../../../models/receipt_detail";

const casualReceiptExportFields = [
    'id',
    'type',
    'description',
    'source',
    'staff_id',
    'staff', // Joined fields
    'customer_id',
    'customer', // ^
    'total',
    'total_money',
    'total_amount',
    'created_at',
    'updated_at',
    'details', // Joined fields
];

export async function getAllReceipts(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');
    let search = query.search;

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualReceiptExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    if (results < 1 || page < 1) {
        return ResponseBuilder.inputError(h, 'Số kết quả / số trang không hợp lệ.', 'invalid_results_page_number');
    }

    let options = {
        include: []
    };

    if (fieldList.includes('staff')) {
        options.include.push({
            model: Staff,
            as: 'staff',
            attributes: ['id', 'username', 'full_name'],
        });
        fieldList.splice(fieldList.indexOf('staff'), 1);
    }
    if (fieldList.includes('customer')) {
        options.include.push({
            model: Customer,
            as: 'customer',
            attributes: ['id', 'full_name', 'phone_number'],
        });
        fieldList.splice(fieldList.indexOf('customer'), 1);
    }
    if (fieldList.includes('details')) {
        options.include.push({
            model: ReceiptDetail,
            as: 'details',
        });
        fieldList.splice(fieldList.indexOf('details'), 1);
    }

    try {
        let receipts = await Receipt.findAll({
            attributes: fieldList,
            limit: parseInt(results),
            offset: (page - 1) * results,
            order: [['id', 'desc']],
            ...options
        });
        let count = await Receipt.count({
            ...options
        });
        return {
            rows: receipts,
            total: count,
        };
    } catch (err) {
        console.log(err);
        return h.code(500);
    }
}

export async function createReceipt(request, h) {
    const payload = request.payload;

    if (!payload.source || !payload.products) {
        return ResponseBuilder.inputError(h, 'Vui lòng không bỏ trống những ô có dấu (*)', 'missing_required_fields');
    }

    let productList = payload.products;
    if (!productList || productList.length <= 0) {
        return ResponseBuilder.inputError(h, 'Vui lòng thêm ít nhất 1 sản phẩm.', 'empty_product_payload');
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();
        const receipt = Receipt.build({
            type: 1, // import
            description: payload.description,
            source: payload.source,
            staff_id: request.staff.id,
            customer_id: null,
            total: 0, // update later
            total_amount: 0, // update later
            total_money: 0, // update later
        });
        if (!await receipt.save({transaction})) {
            if (transaction) await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Lỗi khi tạo Receipt.", 'error_on_create_receipt_1st')
        }

        let total_money = 0;
        let total_amount = 0;

        for (let i = 0; i < productList.length; ++i) {
            const productData = productList[i];
            const product = await Product.findByPk(productData.product_id);
            if (!product) {
                if (transaction) await transaction.rollback();
                return ResponseBuilder.inputError(h, "Sản phẩm không tồn tại.", 'error_on_create_receipt_1st', "product_id:" + productData.product_id)
            }
            if (!productData.amount || !productData.price || productData.price < 0) {
                if (transaction) await transaction.rollback();
                return ResponseBuilder.inputError(h, "Thiếu thông tin nhập sản phẩm (số lương, giá).", 'error_on_create_receipt_1st');
            }

            let product_total_money = productData.amount * productData.price;
            const detail = ReceiptDetail.build({
                receipt_id: receipt.id,
                product_id: productData.product_id,
                price: productData.price,
                amount: productData.amount,
                total_money: product_total_money,
            });
            if (!await detail.save({transaction})) {
                if (transaction) await transaction.rollback();
                return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Lỗi khi tạo receipt detail.", 'error_on_create_receipt_detail');
            }
            product.inventory_quantity += productData.amount;
            if (!await product.save({transaction})) {
                if (transaction) await transaction.rollback();
                return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Không thể cập nhật số lượng sản phẩm.", 'update_inventory_quantity_failed');
            }

            total_money += product_total_money;
            total_amount += productData.amount;
        }

        receipt.total_money = total_money;
        receipt.total_amount = total_amount;
        receipt.total = productList.length;

        if (!await receipt.save({transaction})) {
            if (transaction) await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Lỗi khi tạo phiếu nhập.", 'error_on_create_receipt_2st')
        }

        await transaction.commit();

        return {id: receipt.id}; // success
    } catch (err) {
        if (transaction) await transaction.rollback();
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Lỗi khi tạo phiếu nhập.", 'error_on_create')
    }
}

export async function getReceipt(request, h) {
    let id = request.params.id;

    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id', 'name'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualReceiptExportFields.includes(fieldList[i])) {
            return ResponseBuilder.inputError(h, 'Field list không hợp lệ.', 'invalid_field_list', 'field:' + fieldList[i]);
        }
    }

    let options = {
        include: []
    };

    if (fieldList.includes('staff')) {
        options.include.push({
            model: Staff,
            as: 'staff',
            attributes: ['id', 'username', 'full_name'],
        });
        fieldList.splice(fieldList.indexOf('staff'), 1);
    }
    if (fieldList.includes('customer')) {
        options.include.push({
            model: Customer,
            as: 'customer',
            attributes: ['id', 'full_name', 'phone_number'],
        });
        fieldList.splice(fieldList.indexOf('customer'), 1);
    }
    if (fieldList.includes('details')) {
        options.include.push({
            model: ReceiptDetail,
            as: 'details',
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'bar_code', 'name'],
            }]
        });
        fieldList.splice(fieldList.indexOf('details'), 1);
    }

    let receipt;
    try {
        receipt = await Receipt.findByPk(id, {attributes: fieldList, ...options});
    } catch (err) {
        console.log(err);
    }
    if (!receipt) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Phiếu không tồn tại.', 'receipt_not_found');
    }
    return receipt;
}
