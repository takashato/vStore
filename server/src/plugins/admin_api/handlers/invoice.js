import ResponseBuilder from "../../../helpers/response_builder";
import Staff from "../../../models/staff_imported";
import Customer from "../../../models/customer_imported";
import Invoice from "../../../models/invoice_exported";
import sequelize from "../../../db";
import InvoiceDetail from "../../../models/invoice_detail_exported";
import Product from "../../../models/product_imported";


const casualInvoiceExportFields = [
    'id',
    'staff_id',
    'staff', // Joined fields
    'customer_id',
    'customer', // ^
    'prepaid_value',
    'total_value',
    'discount_value',
    'total_final_value',
    'pay_method',
    'created_at',
    'updated_at',
    'details', // Joined fields
];

export async function getAllInvoices(request, h) {
    const query = request.query;

    let results = query.results;
    let page = query.page || 1;
    let fields = query.fields;
    let fieldList = fields.split(',');
    let search = query.search;

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualInvoiceExportFields.includes(fieldList[i])) {
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
            model: InvoiceDetail,
            as: 'details',
        });
        fieldList.splice(fieldList.indexOf('details'), 1);
    }

    try {
        let invoices = await Invoice.findAll({
            attributes: fieldList,
            limit: parseInt(results),
            offset: (page - 1) * results,
            order: [['id', 'desc']],
            ...options
        });
        let count = await Invoice.count({
            ...options
        });
        return {
            rows: invoices,
            total: count,
        };
    } catch (err) {
        console.log(err);
        return h.code(500);
    }
}

export async function getInvoice(request, h) {
    let id = request.params.id;

    let fields = request.query.fields;
    let fieldList = fields ? fields.split(',') : ['id', 'name'];

    if (!id) {
        return ResponseBuilder.inputError(h, 'Yêu cầu ID.', 'missing_id');
    }

    for (let i = 0; i < fieldList.length; ++i) {
        if (!casualInvoiceExportFields.includes(fieldList[i])) {
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
            model: InvoiceDetail,
            as: 'details',
            include: [{
                model: Product,
                as: 'product',
                attributes: ['id', 'bar_code', 'name'],
            }]
        });
        fieldList.splice(fieldList.indexOf('details'), 1);
    }

    let invoice;
    try {
        invoice = await Invoice.findByPk(id, {attributes: fieldList, ...options});
    } catch (err) {
        console.log(err);
    }
    if (!invoice) {
        return ResponseBuilder.error(h, ResponseBuilder.NOT_FOUND, 'Hóa đơn không tồn tại.', 'invoice_not_found');
    }
    return invoice;
}
