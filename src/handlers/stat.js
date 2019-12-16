import Product from "../models/product_imported";
import sequelize from "../db";
import Staff from "../models/staff_imported";
import moment from "moment";
import ResponseBuilder from "../helpers/response_builder";

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

const dateFormat = 'DD/MM/YYYY';

export async function getRevenue(request, h) {
    const {query} = request;

    const {start, end} = query;

    const startDate = moment(start, dateFormat);
    const endDate = moment(end, dateFormat);

    try {
        let res = await sequelize.query("SELECT DATE(created_at) AS `date`, SUM(`total_final_value`) AS `revenue` FROM `invoice` WHERE DATE(created_at) >= :start AND DATE(created_at) <= :end GROUP BY `date`", {
            replacements: {
                start: startDate.format('YYYY-MM-DD'),
                end: endDate.format('YYYY-MM-DD'),
            },
            type: 'SELECT'
        });
        return res;
    } catch (err) {
        console.log(err);
        return ResponseBuilder.error(h, ResponseBuilder.INTERNAL_ERROR, "Không thể lấy dữ liệu");
    }
}