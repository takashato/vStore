import ResponseBuilder from "../../../helpers/response_builder";
import Customer from "../../../models/customer";
import Product from "../../../models/product";
import sequelize from "../../../db";
import Invoice from "../../../models/invoice";
import InvoiceDetail from "../../../models/invoice_detail";
import Receipt from "../../../models/receipt";
import ReceiptDetail from "../../../models/receipt_detail";
import {requestPayment} from "../../../helpers/momo";

export async function sale(request, h) {
    const {payload} = request;

    const {customer_id, pay_method, prepaid_value, details} = payload;

    if (!details || details.length <= 0) {
        return ResponseBuilder.inputError(h, 'Vui lòng điền đẩy đủ thông tin.', 'missing_required_fields');
    }

    if (pay_method != "0" && pay_method != "1" && pay_method != "2") {
        return ResponseBuilder.inputError(h, 'Phương thức thanh toán không hợp lệ.', 'invalid payment method');
    }

    if (customer_id) {
        if (!await Customer.findByPk(customer_id)) {
            return ResponseBuilder.inputError(h, 'Khách hàng không tồn tại.', 'customer_not_found');
        }
    }

    let transaction;
    try {
        transaction = await sequelize.transaction();

        const invoice = await Invoice.build({
            customer_id,
            staff_id: request.staff.id,
            prepaid_value,
            pay_method,
            total_value: 0, // later
            discount_value: 0, // later
            total_final_value: 0, // later
        });
        if (!await invoice.save({transaction})) {
            await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể tạo đơn hàng', 'cant_create_invoice');
        }

        const receipt = await Receipt.build({
            type: -1, // export
            description: 'Hóa đơn #' + invoice.id,
            source: 'Kho',
            staff_id: request.staff.id,
            customer_id: customer_id,
            total: details.length,
            total_money: 0, // later
            total_amount: 0, // later
        });
        if (!await receipt.save({transaction})) {
            await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể tạo phiếu xuất', 'cant_create_export_receipt');
        }

        for (let i = 0; i < details.length; ++i) {
            const detail = details[i];
            const product = await Product.findByPk(detail.id);
            if (!product || product.is_deleted == 1) {
                await transaction.rollback();
                return ResponseBuilder.inputError(h, 'Sản phẩm (' + detail.id + ') không tồn tại.', 'product_not_found');
            }
            // Create invoice detail
            const product_total_value = (product.original_price || product.price) * detail.amount;
            const product_total_final_value = product.price * detail.amount;
            const product_discount_value = product_total_value - product_total_final_value;
            const invoiceDetail = await InvoiceDetail.build({
                invoice_id: invoice.id,
                product_id: product.id,
                price: product.original_price || product.price,
                quantity: detail.amount,
                total_value: product_total_value,
                discount_value: product_discount_value,
                total_final_value: product_total_final_value,
            });
            if (!await invoiceDetail.save({transaction})) {
                await transaction.rollback();
                return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể tạo thông tin đơn hàng cho sản phẩm (' + product.bar_code + ').', 'cant_create_invoice_detail');
            }
            // Create receipt detail
            const receiptDetail = await ReceiptDetail.build({
                receipt_id: receipt.id,
                product_id: product.id,
                price: product.price,
                amount: detail.amount,
                total_money: product_total_final_value,
            });
            if (!await receiptDetail.save({transaction})) {
                await transaction.rollback();
                return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể tạo thông tin phiếu xuất cho sản phẩm (' + product.bar_code + ').', 'cant_create_receipt_detail');
            }
            // Update product inventory
            product.inventory_quantity -= detail.amount;
            if (!await product.save({transaction})) {
                await transaction.rollback();
                return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể cập nhật số lượng cho sản phẩm (' + product.bar_code + ').', 'cant_update_product');
            }
            // Update invoice
            invoice.total_value += product_total_value;
            invoice.discount_value += product_discount_value;
            invoice.total_final_value += product_total_final_value;
            // Update receipt
            receipt.total_money += product_total_final_value;
            receipt.total_amount += detail.amount;
        }
        // Save invoice
        if (!await invoice.save({transaction})) {
            await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể cập nhật đơn hàng', 'cant_update_invoice');
        }
        // Save receipt
        if (!await receipt.save({transaction})) {
            await transaction.rollback();
            return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Không thể cập nhật phiếu xuất', 'cant_update_export_receipt');
        }

        // Commit changes
        await transaction.commit();

        let redirectUrl = false;
        if (pay_method == "2") {
            const data = await requestPayment({
                requestId: invoice.id.toString(),
                amount: invoice.total_final_value.toString(),
                orderId: invoice.id.toString(),
                returnUrl: "http://localhost:3000/admin/callback/test",
                notifyUrl: "http://localhost:3000/admin/callback/test",
                extraData: "",
            });
            redirectUrl = data.payUrl;
        }

        return {
            id: invoice.id,
            redirectUrl,
        };
    } catch (err) {
        if (transaction) await transaction.rollback();
        console.error(err);
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, 'Gặp lỗi khi tạo đơn hàng.', 'error_on_create');
    }
}
