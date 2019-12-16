import Product from "../models/product_imported";
import sequelize from "../db";
import Staff from "../models/staff_imported";

const {Op} = sequelize;

export async function getStatInfo(request, h) {
    const {query} = request;
    const rawAttributes = query.attributes;
    const attributes = rawAttributes.split(',');

    let data = {};
    for (let i = 0; i < attributes.length; ++i) {
        const attribute = attributes[i];
        switch (attribute) {
            case 'total_product':
                data[attribute] = await Product.count();
                break;
            case 'total_out_of_stock_product':
                data[attribute] = await Product.count({where: {inventory_quantity: 0}});
                break;
            case 'total_staff':
                data[attribute] = await Staff.count({where: {active: 1}});
                break;
            case 'total_customer': 
                data[attribute] = await Staff.count();
                break;
        }
    }

    return data;
}