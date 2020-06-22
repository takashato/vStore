import {resolver} from "graphql-sequelize";

const resolverForOffsetPagination = (Model, options = undefined) => {
    const graphqlSequelizePagination = resolver(Model, {...options, list: true});

    return async (parent, args, context, info) => {
        const returnData = {};
        returnData.rows = await graphqlSequelizePagination(parent, args, context, info);
        const findOptions = {};
        if (options && options.before) {
            options.before(findOptions, {});
        }
        returnData.count = await Model.count(findOptions);
        return returnData;
    };
};

export default resolverForOffsetPagination;
