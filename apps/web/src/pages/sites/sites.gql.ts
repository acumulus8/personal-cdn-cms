import { gql } from '@apollo/client';

export const GET_SITES = gql`
  query GetSites {
    sites {
      id
      name
      domain
      host
      slug
      type
      projectId
    }
  }
`;

export const GET_SITE_DETAIL = gql`
  query GetSiteDetail($id: Int!) {
    site(id: $id) {
      id
      name
      domain
      host
      slug
      type
      description
      projectId
      pages {
        id
        title
        slug
        parentId
      }
    }
  }
`;

export const CREATE_SITE = gql`
  mutation CreateSite($input: CreateSiteInput!) {
    createSite(input: $input) {
      id
      name
      domain
      slug
    }
  }
`;

export const UPDATE_SITE = gql`
  mutation UpdateSite($id: Int!, $input: UpdateSiteInput!) {
    updateSite(id: $id, input: $input) {
      id
      name
      domain
      slug
    }
  }
`;

export const DELETE_SITE = gql`
  mutation DeleteSite($id: Int!) {
    deleteSite(id: $id) {
      id
    }
  }
`;
