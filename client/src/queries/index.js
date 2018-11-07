import { gql } from 'apollo-boost';

export const currentUser = gql`
    query {
        currentUser {
            id
            name
            email
        }
    }
`;
