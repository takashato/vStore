import applyStaffRoute from "./admin_api/routes/staff";
import applyCategoryRoute from "./admin_api/routes/category";
import applyProductRoute from "./admin_api/routes/product";
import applyCustomerRoute from "./admin_api/routes/customer";
import applyReceiptRoute from "./admin_api/routes/receipt";
import applySaleRoute from "./admin_api/routes/sale";
import applyStatRoute from "./admin_api/routes/stat";
import applyInvoiceRoute from "./admin_api/routes/invoice";
import applySettingRoute from "./admin_api/routes/setting";

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
