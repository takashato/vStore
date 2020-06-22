import gql from 'graphql-tag';

export const LOGIN_QUERY = gql`
    query ($auth: AuthInput!){
        authenticate(auth: $auth) {
            id
            token
        }
    }
`;

export const STAFF_LIST_QUERY = gql`
    query StaffList($limit: Int, $offset: Int) {
        staffs_offset(limit: $limit, offset: $offset) {
            count
            rows {
                id
                username
                full_name
                email
                created_at
                group_id
                active
            }
        }
    }
`;

export const GET_STAFF_QUERY = gql`
    query Staff($id: ID!){
        staff(id: $id) {
            id
            username
            full_name
            email
            group_id
            active
        }
    }
`;
