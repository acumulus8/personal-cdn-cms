/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Api = {
  __typename?: 'API';
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum ApiType {
  Cdn = 'CDN',
  Cms = 'CMS',
  ComponentLibrary = 'COMPONENT_LIBRARY',
  Ecommerce = 'ECOMMERCE',
  Other = 'OTHER',
  ThemeLibrary = 'THEME_LIBRARY'
}

export type Address = {
  __typename?: 'Address';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type Client = {
  __typename?: 'Client';
  addresses?: Maybe<Array<Address>>;
  description?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  projects?: Maybe<Array<Project>>;
  slug?: Maybe<Scalars['String']['output']>;
};

export enum ColumnLayout {
  Auto = 'AUTO',
  EqualQuarters = 'EQUAL_QUARTERS',
  EqualThirds = 'EQUAL_THIRDS',
  Full = 'FULL',
  HalfHalf = 'HALF_HALF',
  OneThirdTwoThirds = 'ONE_THIRD_TWO_THIRDS',
  TwoThirdsOneThird = 'TWO_THIRDS_ONE_THIRD'
}

export enum ContainerType {
  Column = 'COLUMN',
  Full = 'FULL',
  Grid = 'GRID',
  Row = 'ROW'
}

export type Content = {
  __typename?: 'Content';
  featuredMedia?: Maybe<Media>;
  featuredMediaId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<ContentMedia>>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  sectionContents?: Maybe<Array<SectionContent>>;
  slug?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  versions?: Maybe<Array<ContentVersion>>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type ContentMedia = {
  __typename?: 'ContentMedia';
  content?: Maybe<Content>;
  contentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
};

export enum ContentState {
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Published = 'PUBLISHED'
}

export enum ContentType {
  Album = 'ALBUM',
  Other = 'OTHER',
  Post = 'POST',
  Text = 'TEXT'
}

export type ContentVersion = {
  __typename?: 'ContentVersion';
  body?: Maybe<Scalars['String']['output']>;
  content?: Maybe<Content>;
  contentId?: Maybe<Scalars['Int']['output']>;
  excerpt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Array<ContentVersionMedia>>;
  state?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  version?: Maybe<Scalars['Int']['output']>;
  visibility?: Maybe<Scalars['String']['output']>;
};

export type ContentVersionMedia = {
  __typename?: 'ContentVersionMedia';
  contentVersion?: Maybe<ContentVersion>;
  contentVersionId?: Maybe<Scalars['Int']['output']>;
  media?: Maybe<Media>;
  mediaId?: Maybe<Scalars['Int']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
};

export enum ContentVisibility {
  Hidden = 'HIDDEN',
  PasswordProtected = 'PASSWORD_PROTECTED',
  Visible = 'VISIBLE'
}

export type CreateApiInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
  type?: InputMaybe<ApiType>;
};

export type CreateClientAddressInput = {
  address1: Scalars['String']['input'];
  address2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  clientId: Scalars['Int']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type CreateClientInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  slug: Scalars['String']['input'];
};

export type CreateContentInput = {
  featuredMediaId?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['Int']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ContentState>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContentType>;
  visibility?: InputMaybe<ContentVisibility>;
};

export type CreateContentMediaInput = {
  contentId: Scalars['Int']['input'];
  mediaId: Scalars['Int']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateContentVersionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  contentId: Scalars['Int']['input'];
  excerpt?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ContentState>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<ContentVisibility>;
};

export type CreateContentVersionMediaInput = {
  contentVersionId: Scalars['Int']['input'];
  mediaId: Scalars['Int']['input'];
  order?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMediaInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  ownerId: Scalars['Int']['input'];
  projectId: Scalars['Int']['input'];
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MediaType>;
  url: Scalars['String']['input'];
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMobileAppInput = {
  category?: InputMaybe<MobileAppCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  platform?: InputMaybe<MobileAppPlatform>;
  projectId: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
  type?: InputMaybe<MobileAppType>;
};

export type CreatePageInput = {
  keywords?: InputMaybe<Scalars['String']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  ogImage?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  projectId: Scalars['Int']['input'];
  siteId: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateProjectInput = {
  clientId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  status: ProjectStatus;
  type: ProjectType;
};

export type CreateSectionContentInput = {
  contentId: Scalars['Int']['input'];
  sectionId: Scalars['Int']['input'];
  type?: InputMaybe<SectionContentType>;
};

export type CreateSectionInput = {
  columnLayout?: InputMaybe<ColumnLayout>;
  containerType?: InputMaybe<ContainerType>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  pageId: Scalars['Int']['input'];
  parentId?: InputMaybe<Scalars['Int']['input']>;
  type: SectionType;
};

export type CreateSiteInput = {
  clientId: Scalars['Int']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  domain: Scalars['String']['input'];
  host: Scalars['String']['input'];
  name: Scalars['String']['input'];
  projectId: Scalars['Int']['input'];
  slug: Scalars['String']['input'];
  type?: InputMaybe<SiteType>;
};

export type Media = {
  __typename?: 'Media';
  altText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  contentMedia?: Maybe<Array<ContentMedia>>;
  contentVersions?: Maybe<Array<ContentVersionMedia>>;
  featuredIn?: Maybe<Array<Content>>;
  filename?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  mimeType?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Client>;
  ownerId?: Maybe<Scalars['Int']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

export enum MediaType {
  Archive = 'ARCHIVE',
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Other = 'OTHER',
  Video = 'VIDEO'
}

export type MobileApp = {
  __typename?: 'MobileApp';
  category?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Array<Page>>;
  platform?: Maybe<Scalars['String']['output']>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export enum MobileAppCategory {
  Entertainment = 'ENTERTAINMENT',
  Games = 'GAMES',
  Other = 'OTHER',
  Productivity = 'PRODUCTIVITY',
  Social = 'SOCIAL',
  Utilities = 'UTILITIES'
}

export enum MobileAppPlatform {
  Android = 'ANDROID',
  AndroidIosWeb = 'ANDROID_IOS_WEB',
  AndroidWeb = 'ANDROID_WEB',
  Ios = 'IOS',
  IosAndroid = 'IOS_ANDROID',
  IosWeb = 'IOS_WEB',
  Other = 'OTHER'
}

export enum MobileAppType {
  Ecommerce = 'ECOMMERCE',
  Game = 'GAME',
  Other = 'OTHER',
  Portfolio = 'PORTFOLIO'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAPI?: Maybe<Api>;
  createClient?: Maybe<Client>;
  createClientAddress?: Maybe<Address>;
  createContent?: Maybe<Content>;
  createContentMedia?: Maybe<ContentMedia>;
  createContentVersion?: Maybe<ContentVersion>;
  createContentVersionMedia?: Maybe<ContentVersionMedia>;
  createMedia?: Maybe<Media>;
  createMobileApp?: Maybe<MobileApp>;
  createPage?: Maybe<Page>;
  createProject?: Maybe<Project>;
  createSection?: Maybe<Section>;
  createSectionContent?: Maybe<SectionContent>;
  createSite: Site;
  deleteAPI?: Maybe<Api>;
  deleteAddress?: Maybe<Address>;
  deleteClient?: Maybe<Client>;
  deleteContent?: Maybe<Content>;
  deleteContentMedia?: Maybe<ContentMedia>;
  deleteContentVersion?: Maybe<ContentVersion>;
  deleteContentVersionMedia?: Maybe<ContentVersionMedia>;
  deleteMedia?: Maybe<Media>;
  deleteMobileApp?: Maybe<MobileApp>;
  deletePage?: Maybe<Page>;
  deleteProject?: Maybe<Project>;
  deleteSection?: Maybe<Section>;
  deleteSectionContent?: Maybe<SectionContent>;
  deleteSite?: Maybe<Site>;
  updateAPI?: Maybe<Api>;
  updateAddress?: Maybe<Address>;
  updateClient?: Maybe<Client>;
  updateContent?: Maybe<Content>;
  updateContentMediaOrder?: Maybe<ContentMedia>;
  updateContentVersion?: Maybe<ContentVersion>;
  updateContentVersionMediaOrder?: Maybe<ContentVersionMedia>;
  updateMedia?: Maybe<Media>;
  updateMobileApp?: Maybe<MobileApp>;
  updatePage?: Maybe<Page>;
  updateProject?: Maybe<Project>;
  updateSection?: Maybe<Section>;
  updateSectionContent?: Maybe<SectionContent>;
  updateSite?: Maybe<Site>;
};


export type MutationCreateApiArgs = {
  input: CreateApiInput;
};


export type MutationCreateClientArgs = {
  input: CreateClientInput;
};


export type MutationCreateClientAddressArgs = {
  input: CreateClientAddressInput;
};


export type MutationCreateContentArgs = {
  input: CreateContentInput;
};


export type MutationCreateContentMediaArgs = {
  input: CreateContentMediaInput;
};


export type MutationCreateContentVersionArgs = {
  input: CreateContentVersionInput;
};


export type MutationCreateContentVersionMediaArgs = {
  input: CreateContentVersionMediaInput;
};


export type MutationCreateMediaArgs = {
  input: CreateMediaInput;
};


export type MutationCreateMobileAppArgs = {
  input: CreateMobileAppInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateSectionArgs = {
  input: CreateSectionInput;
};


export type MutationCreateSectionContentArgs = {
  input: CreateSectionContentInput;
};


export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};


export type MutationDeleteApiArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContentMediaArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContentVersionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteContentVersionMediaArgs = {
  contentVersionId: Scalars['Int']['input'];
  mediaId: Scalars['Int']['input'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteMobileAppArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePageArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSectionContentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteSiteArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateApiArgs = {
  id: Scalars['Int']['input'];
  input: UpdateApiInput;
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};


export type MutationUpdateClientArgs = {
  id: Scalars['Int']['input'];
  input: UpdateClientInput;
};


export type MutationUpdateContentArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContentInput;
};


export type MutationUpdateContentMediaOrderArgs = {
  id: Scalars['Int']['input'];
  order: Scalars['Int']['input'];
};


export type MutationUpdateContentVersionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateContentVersionInput;
};


export type MutationUpdateContentVersionMediaOrderArgs = {
  contentVersionId: Scalars['Int']['input'];
  mediaId: Scalars['Int']['input'];
  order: Scalars['Int']['input'];
};


export type MutationUpdateMediaArgs = {
  id: Scalars['Int']['input'];
  input: UpdateMediaInput;
};


export type MutationUpdateMobileAppArgs = {
  id: Scalars['Int']['input'];
  input: UpdateMobileAppInput;
};


export type MutationUpdatePageArgs = {
  id: Scalars['Int']['input'];
  input: UpdatePageInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['Int']['input'];
  input: UpdateProjectInput;
};


export type MutationUpdateSectionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateSectionInput;
};


export type MutationUpdateSectionContentArgs = {
  id: Scalars['Int']['input'];
  input: UpdateSectionContentInput;
};


export type MutationUpdateSiteArgs = {
  id: Scalars['Int']['input'];
  input: UpdateSiteInput;
};

export type Page = {
  __typename?: 'Page';
  id?: Maybe<Scalars['Int']['output']>;
  keywords?: Maybe<Scalars['String']['output']>;
  metaDescription?: Maybe<Scalars['String']['output']>;
  metaTitle?: Maybe<Scalars['String']['output']>;
  ogImage?: Maybe<Scalars['String']['output']>;
  parentId?: Maybe<Scalars['Int']['output']>;
  parentPage?: Maybe<Page>;
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']['output']>;
  sections?: Maybe<Array<Section>>;
  site?: Maybe<Site>;
  siteId?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  subPages?: Maybe<Array<Page>>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Project = {
  __typename?: 'Project';
  apis?: Maybe<Array<Api>>;
  clientId?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  mobileApps?: Maybe<Array<MobileApp>>;
  name?: Maybe<Scalars['String']['output']>;
  sites?: Maybe<Array<Site>>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum ProjectStatus {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE'
}

export enum ProjectType {
  Api = 'API',
  Library = 'LIBRARY',
  MobileApp = 'MOBILE_APP',
  Other = 'OTHER',
  Website = 'WEBSITE'
}

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  addresses?: Maybe<Array<Address>>;
  api?: Maybe<Api>;
  apis?: Maybe<Array<Api>>;
  client?: Maybe<Client>;
  clients?: Maybe<Array<Client>>;
  content?: Maybe<Content>;
  contentMedia?: Maybe<ContentMedia>;
  contentMedias?: Maybe<Array<ContentMedia>>;
  contentVersion?: Maybe<ContentVersion>;
  contentVersionMedia?: Maybe<ContentVersionMedia>;
  contentVersionMedias?: Maybe<Array<ContentVersionMedia>>;
  contentVersions?: Maybe<Array<ContentVersion>>;
  contents?: Maybe<Array<Content>>;
  media?: Maybe<Media>;
  medias?: Maybe<Array<Media>>;
  mobileApp?: Maybe<MobileApp>;
  mobileApps?: Maybe<Array<MobileApp>>;
  page?: Maybe<Page>;
  pages?: Maybe<Array<Page>>;
  pagesBySite?: Maybe<Array<Page>>;
  project?: Maybe<Project>;
  projects?: Maybe<Array<Project>>;
  section?: Maybe<Section>;
  sectionContent?: Maybe<SectionContent>;
  sectionContents?: Maybe<Array<SectionContent>>;
  sections?: Maybe<Array<Section>>;
  site?: Maybe<Site>;
  sites?: Maybe<Array<Site>>;
};


export type QueryAddressArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAddressesArgs = {
  clientId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryApiArgs = {
  id: Scalars['Int']['input'];
};


export type QueryApisArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryClientArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentMediaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentMediasArgs = {
  contentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryContentVersionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryContentVersionMediaArgs = {
  contentVersionId: Scalars['Int']['input'];
  mediaId: Scalars['Int']['input'];
};


export type QueryContentVersionMediasArgs = {
  contentVersionId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryContentVersionsArgs = {
  contentId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryContentsArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMediaArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMediasArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMobileAppArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMobileAppsArgs = {
  projectId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPageArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPagesBySiteArgs = {
  siteId: Scalars['Int']['input'];
};


export type QueryProjectArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySectionArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySectionContentArgs = {
  id: Scalars['Int']['input'];
};


export type QuerySectionContentsArgs = {
  sectionId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySectionsArgs = {
  pageId?: InputMaybe<Scalars['Int']['input']>;
};


export type QuerySiteArgs = {
  id: Scalars['Int']['input'];
};

export type Section = {
  __typename?: 'Section';
  columnLayout?: Maybe<Scalars['String']['output']>;
  containerType?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  page?: Maybe<Page>;
  pageId?: Maybe<Scalars['Int']['output']>;
  parentId?: Maybe<Scalars['Int']['output']>;
  parentSection?: Maybe<Section>;
  sectionContent?: Maybe<Array<SectionContent>>;
  subSections?: Maybe<Array<Section>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type SectionContent = {
  __typename?: 'SectionContent';
  content?: Maybe<Content>;
  contentId?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  section?: Maybe<Section>;
  sectionId?: Maybe<Scalars['Int']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum SectionContentType {
  Archive = 'ARCHIVE',
  Audio = 'AUDIO',
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Other = 'OTHER',
  Text = 'TEXT',
  Video = 'VIDEO'
}

export enum SectionType {
  BackgroundImage = 'BACKGROUND_IMAGE',
  BackgroundVideo = 'BACKGROUND_VIDEO',
  Banner = 'BANNER',
  Contact = 'CONTACT',
  Cta = 'CTA',
  Gallery = 'GALLERY',
  GalleryItem = 'GALLERY_ITEM',
  Grid = 'GRID',
  GridItem = 'GRID_ITEM',
  Hero = 'HERO',
  Img_1_3Txt_2_3 = 'IMG_1_3_TXT_2_3',
  List = 'LIST',
  ListItem = 'LIST_ITEM',
  Other = 'OTHER',
  Testimonial = 'TESTIMONIAL',
  Txt_2_3Img_1_3 = 'TXT_2_3_IMG_1_3'
}

export type Site = {
  __typename?: 'Site';
  description?: Maybe<Scalars['String']['output']>;
  domain?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pages?: Maybe<Array<Page>>;
  projectId?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum SiteType {
  Blog = 'BLOG',
  Ecommerce = 'ECOMMERCE',
  Other = 'OTHER',
  Portfolio = 'PORTFOLIO',
  WebApp = 'WEB_APP'
}

export type UpdateApiInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ApiType>;
};

export type UpdateAddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateClientInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContentInput = {
  featuredMediaId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ContentState>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContentType>;
  visibility?: InputMaybe<ContentVisibility>;
};

export type UpdateContentVersionInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  excerpt?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<ContentState>;
  title?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<ContentVisibility>;
};

export type UpdateMediaInput = {
  altText?: InputMaybe<Scalars['String']['input']>;
  caption?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  mimeType?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<MediaType>;
  url?: InputMaybe<Scalars['String']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateMobileAppInput = {
  category?: InputMaybe<MobileAppCategory>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  platform?: InputMaybe<MobileAppPlatform>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<MobileAppType>;
};

export type UpdatePageInput = {
  keywords?: InputMaybe<Scalars['String']['input']>;
  metaDescription?: InputMaybe<Scalars['String']['input']>;
  metaTitle?: InputMaybe<Scalars['String']['input']>;
  ogImage?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProjectStatus>;
  type?: InputMaybe<ProjectType>;
};

export type UpdateSectionContentInput = {
  type: SectionContentType;
};

export type UpdateSectionInput = {
  columnLayout?: InputMaybe<ColumnLayout>;
  containerType?: InputMaybe<ContainerType>;
  name?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  parentId?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<SectionType>;
};

export type UpdateSiteInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  domain?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SiteType>;
};

export type GetApisQueryVariables = Exact<{ [key: string]: never; }>;


export type GetApisQuery = { __typename?: 'Query', apis?: Array<{ __typename?: 'API', id?: number | null, name?: string | null, slug?: string | null, type?: string | null, description?: string | null, projectId?: number | null, createdAt?: string | null }> | null };

export type GetApiDetailQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetApiDetailQuery = { __typename?: 'Query', api?: { __typename?: 'API', id?: number | null, name?: string | null, slug?: string | null, type?: string | null, description?: string | null, projectId?: number | null, createdAt?: string | null, updatedAt?: string | null, project?: { __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null } | null } | null };

export type CreateApiMutationVariables = Exact<{
  input: CreateApiInput;
}>;


export type CreateApiMutation = { __typename?: 'Mutation', createAPI?: { __typename?: 'API', id?: number | null, name?: string | null, slug?: string | null } | null };

export type UpdateApiMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateApiInput;
}>;


export type UpdateApiMutation = { __typename?: 'Mutation', updateAPI?: { __typename?: 'API', id?: number | null, name?: string | null, slug?: string | null } | null };

export type DeleteApiMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteApiMutation = { __typename?: 'Mutation', deleteAPI?: { __typename?: 'API', id?: number | null } | null };

export type GetClientQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetClientQuery = { __typename?: 'Query', client?: { __typename?: 'Client', id?: number | null, name?: string | null, email?: string | null, phone?: string | null, slug?: string | null, description?: string | null } | null };

export type GetClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClientsQuery = { __typename?: 'Query', clients?: Array<{ __typename?: 'Client', id?: number | null, name?: string | null, email?: string | null, phone?: string | null, slug?: string | null, description?: string | null }> | null };

export type CreateClientMutationVariables = Exact<{
  input: CreateClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient?: { __typename?: 'Client', id?: number | null, name?: string | null, email?: string | null, phone?: string | null, slug?: string | null } | null };

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateClientInput;
}>;


export type UpdateClientMutation = { __typename?: 'Mutation', updateClient?: { __typename?: 'Client', id?: number | null, name?: string | null, email?: string | null, phone?: string | null, slug?: string | null } | null };

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteClientMutation = { __typename?: 'Mutation', deleteClient?: { __typename?: 'Client', id?: number | null } | null };

export type GetMobileAppsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMobileAppsQuery = { __typename?: 'Query', mobileApps?: Array<{ __typename?: 'MobileApp', id?: number | null, name?: string | null, slug?: string | null, platform?: string | null, category?: string | null, type?: string | null, projectId?: number | null }> | null };

export type CreateMobileAppMutationVariables = Exact<{
  input: CreateMobileAppInput;
}>;


export type CreateMobileAppMutation = { __typename?: 'Mutation', createMobileApp?: { __typename?: 'MobileApp', id?: number | null, name?: string | null, slug?: string | null } | null };

export type UpdateMobileAppMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateMobileAppInput;
}>;


export type UpdateMobileAppMutation = { __typename?: 'Mutation', updateMobileApp?: { __typename?: 'MobileApp', id?: number | null, name?: string | null, slug?: string | null } | null };

export type DeleteMobileAppMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteMobileAppMutation = { __typename?: 'Mutation', deleteMobileApp?: { __typename?: 'MobileApp', id?: number | null } | null };

export type GetProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProjectsQuery = { __typename?: 'Query', projects?: Array<{ __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null, description?: string | null, clientId?: number | null }> | null };

export type CreateProjectMutationVariables = Exact<{
  input: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject?: { __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null } | null };

export type UpdateProjectMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject?: { __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null } | null };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject?: { __typename?: 'Project', id?: number | null } | null };

export type GetProjectByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProjectByIdQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null } | null };

export type GetProjectDetailQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id?: number | null, name?: string | null, slug?: string | null, status?: string | null, type?: string | null, description?: string | null, clientId?: number | null, sites?: Array<{ __typename?: 'Site', id?: number | null, name?: string | null, domain?: string | null, slug?: string | null, type?: string | null }> | null, mobileApps?: Array<{ __typename?: 'MobileApp', id?: number | null, name?: string | null, slug?: string | null, platform?: string | null, category?: string | null, type?: string | null }> | null, apis?: Array<{ __typename?: 'API', id?: number | null, name?: string | null, slug?: string | null, type?: string | null, description?: string | null }> | null } | null };

export type GetSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSitesQuery = { __typename?: 'Query', sites?: Array<{ __typename?: 'Site', id?: number | null, name?: string | null, domain?: string | null, host?: string | null, slug?: string | null, type?: string | null, projectId?: number | null }> | null };

export type GetSiteDetailQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetSiteDetailQuery = { __typename?: 'Query', site?: { __typename?: 'Site', id?: number | null, name?: string | null, domain?: string | null, host?: string | null, slug?: string | null, type?: string | null, description?: string | null, projectId?: number | null, pages?: Array<{ __typename?: 'Page', id?: number | null, title?: string | null, slug?: string | null, parentId?: number | null }> | null } | null };

export type CreateSiteMutationVariables = Exact<{
  input: CreateSiteInput;
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename?: 'Site', id?: number | null, name?: string | null, domain?: string | null, slug?: string | null } };

export type UpdateSiteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateSiteInput;
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite?: { __typename?: 'Site', id?: number | null, name?: string | null, domain?: string | null, slug?: string | null } | null };

export type DeleteSiteMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteSiteMutation = { __typename?: 'Mutation', deleteSite?: { __typename?: 'Site', id?: number | null } | null };


export const GetApisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GetApisQuery, GetApisQueryVariables>;
export const GetApiDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetApiDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"api"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]}}]} as unknown as DocumentNode<GetApiDetailQuery, GetApiDetailQueryVariables>;
export const CreateApiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAPI"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateAPIInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAPI"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateApiMutation, CreateApiMutationVariables>;
export const UpdateApiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAPI"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAPIInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAPI"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<UpdateApiMutation, UpdateApiMutationVariables>;
export const DeleteApiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAPI"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAPI"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteApiMutation, DeleteApiMutationVariables>;
export const GetClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetClientQuery, GetClientQueryVariables>;
export const GetClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<GetClientsQuery, GetClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<UpdateClientMutation, UpdateClientMutationVariables>;
export const DeleteClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteClientMutation, DeleteClientMutationVariables>;
export const GetMobileAppsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMobileApps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mobileApps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]} as unknown as DocumentNode<GetMobileAppsQuery, GetMobileAppsQueryVariables>;
export const CreateMobileAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateMobileApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateMobileAppInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createMobileApp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateMobileAppMutation, CreateMobileAppMutationVariables>;
export const UpdateMobileAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateMobileApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMobileAppInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMobileApp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<UpdateMobileAppMutation, UpdateMobileAppMutationVariables>;
export const DeleteMobileAppDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteMobileApp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMobileApp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteMobileAppMutation, DeleteMobileAppMutationVariables>;
export const GetProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}}]}}]}}]} as unknown as DocumentNode<GetProjectsQuery, GetProjectsQueryVariables>;
export const CreateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<CreateProjectMutation, CreateProjectMutationVariables>;
export const UpdateProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateProjectInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const DeleteProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteProject"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteProject"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetProjectByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<GetProjectByIdQuery, GetProjectByIdQueryVariables>;
export const GetProjectDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProjectDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"mobileApps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"apis"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetProjectDetailQuery, GetProjectDetailQueryVariables>;
export const GetSitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sites"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]} as unknown as DocumentNode<GetSitesQuery, GetSitesQueryVariables>;
export const GetSiteDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSiteDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"host"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"pages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"parentId"}}]}}]}}]}}]} as unknown as DocumentNode<GetSiteDetailQuery, GetSiteDetailQueryVariables>;
export const CreateSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSiteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateSiteMutation, CreateSiteMutationVariables>;
export const UpdateSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSiteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"domain"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<UpdateSiteMutation, UpdateSiteMutationVariables>;
export const DeleteSiteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteSite"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteSite"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteSiteMutation, DeleteSiteMutationVariables>;