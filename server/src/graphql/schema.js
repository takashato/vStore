import path from 'path';
import {makeExecutableSchema} from "graphql-tools";
import {loadFilesSync} from "@graphql-tools/load-files";
import {mergeTypeDefs} from "@graphql-tools/merge";
import Query from "./resolvers/query";
import ProductResolver from "./resolvers/product";


const typesArray = loadFilesSync(path.join(__dirname, './types'), { recursive: true });

export const typeDefs = mergeTypeDefs(typesArray);
export const resolvers = {
    Query: Query,
    Product: ProductResolver
};

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default executableSchema;

