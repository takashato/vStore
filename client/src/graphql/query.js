import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query ($auth: AuthInput!){
        authenticate(auth: $auth) {
            id
            token
        }
    }
`;
