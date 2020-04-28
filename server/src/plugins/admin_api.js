import applyStaffRoute from "../routes/staff";
import applyCategoryRoute from "../routes/category";
import applyProductRoute from "../routes/product";
import applyCustomerRoute from "../routes/customer";
import applyReceiptRoute from "../routes/receipt";
import applySaleRoute from "../routes/sale";
import applyStatRoute from "../routes/stat";
import applyInvoiceRoute from "../routes/invoice";
import applySettingRoute from "../routes/setting";

const AdminApiPlugin = {
    name: 'admin_api',
    register: async function(server, options) {
        applyStaffRoute(server);
        applyCategoryRoute(server);
        applyProductRoute(server);
        applyCustomerRoute(server);
        applyReceiptRoute(server);
        applySaleRoute(server);
        applyStatRoute(server);
        applyInvoiceRoute(server);
        applySettingRoute(server);
    },
};

export default AdminApiPlugin;
