import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      slug
      status
      type
      description
      clientId
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
      name
      slug
      status
      type
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      slug
      status
      type
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export const GET_PROJECT_BY_ID = gql`
  query GetProjectById($id: Int!) {
    project(id: $id) {
      id
      name
      slug
      status
      type
    }
  }
`;

export const GET_PROJECT_DETAIL = gql`
  query GetProjectDetail($id: Int!) {
    project(id: $id) {
      id
      name
      slug
      status
      type
      description
      clientId
      sites {
        id
        name
        domain
        slug
        type
      }
      mobileApps {
        id
        name
        slug
        platform
        category
        type
      }
      apis {
        id
        name
        slug
        type
        description
      }
    }
  }
`;
