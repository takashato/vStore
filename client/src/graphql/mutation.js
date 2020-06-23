import gql from "graphql-tag";

export const CREATE_UPDATE_STAFF_MUTATION = gql`
    mutation Staff($staff: StaffInput!) {
        staff(staff: $staff) {
            id
            username
            full_name
            email
            group_id
            active
        }
    }
`;
