import { gql } from '@apollo/client';

export const GET_MOBILE_APPS = gql`
  query GetMobileApps {
    mobileApps {
      id
      name
      slug
      platform
      category
      type
      projectId
    }
  }
`;

export const CREATE_MOBILE_APP = gql`
  mutation CreateMobileApp($input: CreateMobileAppInput!) {
    createMobileApp(input: $input) {
      id
      name
      slug
    }
  }
`;

export const UPDATE_MOBILE_APP = gql`
  mutation UpdateMobileApp($id: Int!, $input: UpdateMobileAppInput!) {
    updateMobileApp(id: $id, input: $input) {
      id
      name
      slug
    }
  }
`;

export const DELETE_MOBILE_APP = gql`
  mutation DeleteMobileApp($id: Int!) {
    deleteMobileApp(id: $id) {
      id
    }
  }
`;
