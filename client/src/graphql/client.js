import ApolloClient from 'apollo-boost';
import {graphql} from '../config.json';

const client = new ApolloClient({
    uri: graphql.url,
});

export default client;
