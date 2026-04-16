import { gql } from '@apollo/client';

export const GET_CLIENT_BY_ID = gql`
  query GetClient($id: Int!) {
    client(id: $id) {
      id
      name
      email
      phone
      slug
      description
    }
  }
`;

export const GET_CLIENTS = gql`
  query GetClients {
    clients {
      id
      name
      email
      phone
      slug
      description
    }
  }
`;

export const CREATE_CLIENT = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
      name
      email
      phone
      slug
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($id: Int!, $input: UpdateClientInput!) {
    updateClient(id: $id, input: $input) {
      id
      name
      email
      phone
      slug
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClient($id: Int!) {
    deleteClient(id: $id) {
      id
    }
  }
`;
