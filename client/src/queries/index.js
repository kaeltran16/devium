import { gql } from 'apollo-boost';

export const getCurrentUser = gql`
    query {
        currentUser {
            id
            name
            email
        }
    }
`;

export const register = gql`
    mutation($data: CreateUserInput!) {
        register(data: $data) {
            token,
            user {
                id,
                name,
                email
            }
        }
    }
`;

export const login = gql`
    mutation($data: LoginUserInput!) {
        login(data: $data) {
            token,
            user {
                id,
                name,
                email
            }
        }
    }
`;
