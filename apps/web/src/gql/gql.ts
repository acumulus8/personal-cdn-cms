/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetApis {\n    apis {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n    }\n  }\n": typeof types.GetApisDocument,
    "\n  query GetApiDetail($id: Int!) {\n    api(id: $id) {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n      updatedAt\n      project {\n        id\n        name\n        slug\n        status\n        type\n      }\n    }\n  }\n": typeof types.GetApiDetailDocument,
    "\n  mutation CreateAPI($input: CreateAPIInput!) {\n    createAPI(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": typeof types.CreateApiDocument,
    "\n  mutation UpdateAPI($id: Int!, $input: UpdateAPIInput!) {\n    updateAPI(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": typeof types.UpdateApiDocument,
    "\n  mutation DeleteAPI($id: Int!) {\n    deleteAPI(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteApiDocument,
    "\n  query GetClient($id: Int!) {\n    client(id: $id) {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n": typeof types.GetClientDocument,
    "\n  query GetClients {\n    clients {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n": typeof types.GetClientsDocument,
    "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n": typeof types.CreateClientDocument,
    "\n  mutation UpdateClient($id: Int!, $input: UpdateClientInput!) {\n    updateClient(id: $id, input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n": typeof types.UpdateClientDocument,
    "\n  mutation DeleteClient($id: Int!) {\n    deleteClient(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteClientDocument,
    "\n  query GetMobileApps {\n    mobileApps {\n      id\n      name\n      slug\n      platform\n      category\n      type\n      projectId\n    }\n  }\n": typeof types.GetMobileAppsDocument,
    "\n  mutation CreateMobileApp($input: CreateMobileAppInput!) {\n    createMobileApp(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": typeof types.CreateMobileAppDocument,
    "\n  mutation UpdateMobileApp($id: Int!, $input: UpdateMobileAppInput!) {\n    updateMobileApp(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": typeof types.UpdateMobileAppDocument,
    "\n  mutation DeleteMobileApp($id: Int!) {\n    deleteMobileApp(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteMobileAppDocument,
    "\n  query GetProjects {\n    projects {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n    }\n  }\n": typeof types.GetProjectsDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": typeof types.CreateProjectDocument,
    "\n  mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": typeof types.UpdateProjectDocument,
    "\n  mutation DeleteProject($id: Int!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteProjectDocument,
    "\n  query GetProjectById($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": typeof types.GetProjectByIdDocument,
    "\n  query GetProjectDetail($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n      sites {\n        id\n        name\n        domain\n        slug\n        type\n      }\n      mobileApps {\n        id\n        name\n        slug\n        platform\n        category\n        type\n      }\n      apis {\n        id\n        name\n        slug\n        type\n        description\n      }\n    }\n  }\n": typeof types.GetProjectDetailDocument,
    "\n  query GetSites {\n    sites {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      projectId\n    }\n  }\n": typeof types.GetSitesDocument,
    "\n  query GetSiteDetail($id: Int!) {\n    site(id: $id) {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      description\n      projectId\n      pages {\n        id\n        title\n        slug\n        parentId\n      }\n    }\n  }\n": typeof types.GetSiteDetailDocument,
    "\n  mutation CreateSite($input: CreateSiteInput!) {\n    createSite(input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n": typeof types.CreateSiteDocument,
    "\n  mutation UpdateSite($id: Int!, $input: UpdateSiteInput!) {\n    updateSite(id: $id, input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n": typeof types.UpdateSiteDocument,
    "\n  mutation DeleteSite($id: Int!) {\n    deleteSite(id: $id) {\n      id\n    }\n  }\n": typeof types.DeleteSiteDocument,
};
const documents: Documents = {
    "\n  query GetApis {\n    apis {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n    }\n  }\n": types.GetApisDocument,
    "\n  query GetApiDetail($id: Int!) {\n    api(id: $id) {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n      updatedAt\n      project {\n        id\n        name\n        slug\n        status\n        type\n      }\n    }\n  }\n": types.GetApiDetailDocument,
    "\n  mutation CreateAPI($input: CreateAPIInput!) {\n    createAPI(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": types.CreateApiDocument,
    "\n  mutation UpdateAPI($id: Int!, $input: UpdateAPIInput!) {\n    updateAPI(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": types.UpdateApiDocument,
    "\n  mutation DeleteAPI($id: Int!) {\n    deleteAPI(id: $id) {\n      id\n    }\n  }\n": types.DeleteApiDocument,
    "\n  query GetClient($id: Int!) {\n    client(id: $id) {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n": types.GetClientDocument,
    "\n  query GetClients {\n    clients {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n": types.GetClientsDocument,
    "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n": types.CreateClientDocument,
    "\n  mutation UpdateClient($id: Int!, $input: UpdateClientInput!) {\n    updateClient(id: $id, input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n": types.UpdateClientDocument,
    "\n  mutation DeleteClient($id: Int!) {\n    deleteClient(id: $id) {\n      id\n    }\n  }\n": types.DeleteClientDocument,
    "\n  query GetMobileApps {\n    mobileApps {\n      id\n      name\n      slug\n      platform\n      category\n      type\n      projectId\n    }\n  }\n": types.GetMobileAppsDocument,
    "\n  mutation CreateMobileApp($input: CreateMobileAppInput!) {\n    createMobileApp(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": types.CreateMobileAppDocument,
    "\n  mutation UpdateMobileApp($id: Int!, $input: UpdateMobileAppInput!) {\n    updateMobileApp(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n": types.UpdateMobileAppDocument,
    "\n  mutation DeleteMobileApp($id: Int!) {\n    deleteMobileApp(id: $id) {\n      id\n    }\n  }\n": types.DeleteMobileAppDocument,
    "\n  query GetProjects {\n    projects {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n    }\n  }\n": types.GetProjectsDocument,
    "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": types.CreateProjectDocument,
    "\n  mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": types.UpdateProjectDocument,
    "\n  mutation DeleteProject($id: Int!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n": types.DeleteProjectDocument,
    "\n  query GetProjectById($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n": types.GetProjectByIdDocument,
    "\n  query GetProjectDetail($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n      sites {\n        id\n        name\n        domain\n        slug\n        type\n      }\n      mobileApps {\n        id\n        name\n        slug\n        platform\n        category\n        type\n      }\n      apis {\n        id\n        name\n        slug\n        type\n        description\n      }\n    }\n  }\n": types.GetProjectDetailDocument,
    "\n  query GetSites {\n    sites {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      projectId\n    }\n  }\n": types.GetSitesDocument,
    "\n  query GetSiteDetail($id: Int!) {\n    site(id: $id) {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      description\n      projectId\n      pages {\n        id\n        title\n        slug\n        parentId\n      }\n    }\n  }\n": types.GetSiteDetailDocument,
    "\n  mutation CreateSite($input: CreateSiteInput!) {\n    createSite(input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n": types.CreateSiteDocument,
    "\n  mutation UpdateSite($id: Int!, $input: UpdateSiteInput!) {\n    updateSite(id: $id, input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n": types.UpdateSiteDocument,
    "\n  mutation DeleteSite($id: Int!) {\n    deleteSite(id: $id) {\n      id\n    }\n  }\n": types.DeleteSiteDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetApis {\n    apis {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetApis {\n    apis {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetApiDetail($id: Int!) {\n    api(id: $id) {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n      updatedAt\n      project {\n        id\n        name\n        slug\n        status\n        type\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetApiDetail($id: Int!) {\n    api(id: $id) {\n      id\n      name\n      slug\n      type\n      description\n      projectId\n      createdAt\n      updatedAt\n      project {\n        id\n        name\n        slug\n        status\n        type\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAPI($input: CreateAPIInput!) {\n    createAPI(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAPI($input: CreateAPIInput!) {\n    createAPI(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateAPI($id: Int!, $input: UpdateAPIInput!) {\n    updateAPI(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAPI($id: Int!, $input: UpdateAPIInput!) {\n    updateAPI(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAPI($id: Int!) {\n    deleteAPI(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteAPI($id: Int!) {\n    deleteAPI(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetClient($id: Int!) {\n    client(id: $id) {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetClient($id: Int!) {\n    client(id: $id) {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetClients {\n    clients {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query GetClients {\n    clients {\n      id\n      name\n      email\n      phone\n      slug\n      description\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateClient($id: Int!, $input: UpdateClientInput!) {\n    updateClient(id: $id, input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateClient($id: Int!, $input: UpdateClientInput!) {\n    updateClient(id: $id, input: $input) {\n      id\n      name\n      email\n      phone\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteClient($id: Int!) {\n    deleteClient(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteClient($id: Int!) {\n    deleteClient(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMobileApps {\n    mobileApps {\n      id\n      name\n      slug\n      platform\n      category\n      type\n      projectId\n    }\n  }\n"): (typeof documents)["\n  query GetMobileApps {\n    mobileApps {\n      id\n      name\n      slug\n      platform\n      category\n      type\n      projectId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMobileApp($input: CreateMobileAppInput!) {\n    createMobileApp(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMobileApp($input: CreateMobileAppInput!) {\n    createMobileApp(input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateMobileApp($id: Int!, $input: UpdateMobileAppInput!) {\n    updateMobileApp(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMobileApp($id: Int!, $input: UpdateMobileAppInput!) {\n    updateMobileApp(id: $id, input: $input) {\n      id\n      name\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteMobileApp($id: Int!) {\n    deleteMobileApp(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMobileApp($id: Int!) {\n    deleteMobileApp(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjects {\n    projects {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n    }\n  }\n"): (typeof documents)["\n  query GetProjects {\n    projects {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProject($input: CreateProjectInput!) {\n    createProject(input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateProject($id: Int!, $input: UpdateProjectInput!) {\n    updateProject(id: $id, input: $input) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteProject($id: Int!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteProject($id: Int!) {\n    deleteProject(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectById($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"): (typeof documents)["\n  query GetProjectById($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProjectDetail($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n      sites {\n        id\n        name\n        domain\n        slug\n        type\n      }\n      mobileApps {\n        id\n        name\n        slug\n        platform\n        category\n        type\n      }\n      apis {\n        id\n        name\n        slug\n        type\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProjectDetail($id: Int!) {\n    project(id: $id) {\n      id\n      name\n      slug\n      status\n      type\n      description\n      clientId\n      sites {\n        id\n        name\n        domain\n        slug\n        type\n      }\n      mobileApps {\n        id\n        name\n        slug\n        platform\n        category\n        type\n      }\n      apis {\n        id\n        name\n        slug\n        type\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSites {\n    sites {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      projectId\n    }\n  }\n"): (typeof documents)["\n  query GetSites {\n    sites {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      projectId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetSiteDetail($id: Int!) {\n    site(id: $id) {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      description\n      projectId\n      pages {\n        id\n        title\n        slug\n        parentId\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetSiteDetail($id: Int!) {\n    site(id: $id) {\n      id\n      name\n      domain\n      host\n      slug\n      type\n      description\n      projectId\n      pages {\n        id\n        title\n        slug\n        parentId\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSite($input: CreateSiteInput!) {\n    createSite(input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSite($input: CreateSiteInput!) {\n    createSite(input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSite($id: Int!, $input: UpdateSiteInput!) {\n    updateSite(id: $id, input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSite($id: Int!, $input: UpdateSiteInput!) {\n    updateSite(id: $id, input: $input) {\n      id\n      name\n      domain\n      slug\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteSite($id: Int!) {\n    deleteSite(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteSite($id: Int!) {\n    deleteSite(id: $id) {\n      id\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;