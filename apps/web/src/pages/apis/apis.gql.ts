import { gql } from '@apollo/client';

export const GET_APIS = gql`
  query GetApis {
    apis {
      id
      name
      slug
      type
      description
      projectId
      createdAt
    }
  }
`;

export const GET_API_DETAIL = gql`
  query GetApiDetail($id: Int!) {
    api(id: $id) {
      id
      name
      slug
      type
      description
      projectId
      createdAt
      updatedAt
      project {
        id
        name
        slug
        status
        type
      }
    }
  }
`;

export const CREATE_API = gql`
  mutation CreateAPI($input: CreateAPIInput!) {
    createAPI(input: $input) {
      id
      name
      slug
    }
  }
`;

export const UPDATE_API = gql`
  mutation UpdateAPI($id: Int!, $input: UpdateAPIInput!) {
    updateAPI(id: $id, input: $input) {
      id
      name
      slug
    }
  }
`;

export const DELETE_API = gql`
  mutation DeleteAPI($id: Int!) {
    deleteAPI(id: $id) {
      id
    }
  }
`;
