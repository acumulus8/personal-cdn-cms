/* eslint-disable */
import type { Prisma, Address, Client, Page, Section, SectionContent, Content, ContentVersion, ContentVersionMedia, ContentMedia, Media, Project, Site, MobileApp, API, User } from "../generated/prisma/index.js";
import type { PothosPrismaDatamodel } from "@pothos/plugin-prisma";
export default interface PrismaTypes {
    Address: {
        Name: "Address";
        Shape: Address;
        Include: Prisma.AddressInclude;
        Select: Prisma.AddressSelect;
        OrderBy: Prisma.AddressOrderByWithRelationInput;
        WhereUnique: Prisma.AddressWhereUniqueInput;
        Where: Prisma.AddressWhereInput;
        Create: {};
        Update: {};
        RelationName: "clients";
        ListRelations: "clients";
        Relations: {
            clients: {
                Shape: Client[];
                Name: "Client";
                Nullable: false;
            };
        };
    };
    Client: {
        Name: "Client";
        Shape: Client;
        Include: Prisma.ClientInclude;
        Select: Prisma.ClientSelect;
        OrderBy: Prisma.ClientOrderByWithRelationInput;
        WhereUnique: Prisma.ClientWhereUniqueInput;
        Where: Prisma.ClientWhereInput;
        Create: {};
        Update: {};
        RelationName: "address" | "media" | "projects";
        ListRelations: "address" | "media" | "projects";
        Relations: {
            address: {
                Shape: Address[];
                Name: "Address";
                Nullable: false;
            };
            media: {
                Shape: Media[];
                Name: "Media";
                Nullable: false;
            };
            projects: {
                Shape: Project[];
                Name: "Project";
                Nullable: false;
            };
        };
    };
    Page: {
        Name: "Page";
        Shape: Page;
        Include: Prisma.PageInclude;
        Select: Prisma.PageSelect;
        OrderBy: Prisma.PageOrderByWithRelationInput;
        WhereUnique: Prisma.PageWhereUniqueInput;
        Where: Prisma.PageWhereInput;
        Create: {};
        Update: {};
        RelationName: "project" | "site" | "sections" | "subPages" | "parentPage";
        ListRelations: "sections" | "subPages";
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
            site: {
                Shape: Site;
                Name: "Site";
                Nullable: false;
            };
            sections: {
                Shape: Section[];
                Name: "Section";
                Nullable: false;
            };
            subPages: {
                Shape: Page[];
                Name: "Page";
                Nullable: false;
            };
            parentPage: {
                Shape: Page | null;
                Name: "Page";
                Nullable: true;
            };
        };
    };
    Section: {
        Name: "Section";
        Shape: Section;
        Include: Prisma.SectionInclude;
        Select: Prisma.SectionSelect;
        OrderBy: Prisma.SectionOrderByWithRelationInput;
        WhereUnique: Prisma.SectionWhereUniqueInput;
        Where: Prisma.SectionWhereInput;
        Create: {};
        Update: {};
        RelationName: "sectionContent" | "page" | "parentSection" | "subSections";
        ListRelations: "sectionContent" | "subSections";
        Relations: {
            sectionContent: {
                Shape: SectionContent[];
                Name: "SectionContent";
                Nullable: false;
            };
            page: {
                Shape: Page;
                Name: "Page";
                Nullable: false;
            };
            parentSection: {
                Shape: Section | null;
                Name: "Section";
                Nullable: true;
            };
            subSections: {
                Shape: Section[];
                Name: "Section";
                Nullable: false;
            };
        };
    };
    SectionContent: {
        Name: "SectionContent";
        Shape: SectionContent;
        Include: Prisma.SectionContentInclude;
        Select: Prisma.SectionContentSelect;
        OrderBy: Prisma.SectionContentOrderByWithRelationInput;
        WhereUnique: Prisma.SectionContentWhereUniqueInput;
        Where: Prisma.SectionContentWhereInput;
        Create: {};
        Update: {};
        RelationName: "content" | "section";
        ListRelations: never;
        Relations: {
            content: {
                Shape: Content;
                Name: "Content";
                Nullable: false;
            };
            section: {
                Shape: Section;
                Name: "Section";
                Nullable: false;
            };
        };
    };
    Content: {
        Name: "Content";
        Shape: Content;
        Include: Prisma.ContentInclude;
        Select: Prisma.ContentSelect;
        OrderBy: Prisma.ContentOrderByWithRelationInput;
        WhereUnique: Prisma.ContentWhereUniqueInput;
        Where: Prisma.ContentWhereInput;
        Create: {};
        Update: {};
        RelationName: "project" | "versions" | "sectionContents" | "media" | "featuredMedia";
        ListRelations: "versions" | "sectionContents" | "media";
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
            versions: {
                Shape: ContentVersion[];
                Name: "ContentVersion";
                Nullable: false;
            };
            sectionContents: {
                Shape: SectionContent[];
                Name: "SectionContent";
                Nullable: false;
            };
            media: {
                Shape: ContentMedia[];
                Name: "ContentMedia";
                Nullable: false;
            };
            featuredMedia: {
                Shape: Media | null;
                Name: "Media";
                Nullable: true;
            };
        };
    };
    ContentVersion: {
        Name: "ContentVersion";
        Shape: ContentVersion;
        Include: Prisma.ContentVersionInclude;
        Select: Prisma.ContentVersionSelect;
        OrderBy: Prisma.ContentVersionOrderByWithRelationInput;
        WhereUnique: Prisma.ContentVersionWhereUniqueInput;
        Where: Prisma.ContentVersionWhereInput;
        Create: {};
        Update: {};
        RelationName: "content" | "media";
        ListRelations: "media";
        Relations: {
            content: {
                Shape: Content;
                Name: "Content";
                Nullable: false;
            };
            media: {
                Shape: ContentVersionMedia[];
                Name: "ContentVersionMedia";
                Nullable: false;
            };
        };
    };
    ContentVersionMedia: {
        Name: "ContentVersionMedia";
        Shape: ContentVersionMedia;
        Include: Prisma.ContentVersionMediaInclude;
        Select: Prisma.ContentVersionMediaSelect;
        OrderBy: Prisma.ContentVersionMediaOrderByWithRelationInput;
        WhereUnique: Prisma.ContentVersionMediaWhereUniqueInput;
        Where: Prisma.ContentVersionMediaWhereInput;
        Create: {};
        Update: {};
        RelationName: "contentVersion" | "media";
        ListRelations: never;
        Relations: {
            contentVersion: {
                Shape: ContentVersion;
                Name: "ContentVersion";
                Nullable: false;
            };
            media: {
                Shape: Media;
                Name: "Media";
                Nullable: false;
            };
        };
    };
    ContentMedia: {
        Name: "ContentMedia";
        Shape: ContentMedia;
        Include: Prisma.ContentMediaInclude;
        Select: Prisma.ContentMediaSelect;
        OrderBy: Prisma.ContentMediaOrderByWithRelationInput;
        WhereUnique: Prisma.ContentMediaWhereUniqueInput;
        Where: Prisma.ContentMediaWhereInput;
        Create: {};
        Update: {};
        RelationName: "content" | "media";
        ListRelations: never;
        Relations: {
            content: {
                Shape: Content;
                Name: "Content";
                Nullable: false;
            };
            media: {
                Shape: Media;
                Name: "Media";
                Nullable: false;
            };
        };
    };
    Media: {
        Name: "Media";
        Shape: Media;
        Include: Prisma.MediaInclude;
        Select: Prisma.MediaSelect;
        OrderBy: Prisma.MediaOrderByWithRelationInput;
        WhereUnique: Prisma.MediaWhereUniqueInput;
        Where: Prisma.MediaWhereInput;
        Create: {};
        Update: {};
        RelationName: "owner" | "project" | "contentVersions" | "contentMedia" | "featuredIn";
        ListRelations: "contentVersions" | "contentMedia" | "featuredIn";
        Relations: {
            owner: {
                Shape: Client;
                Name: "Client";
                Nullable: false;
            };
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
            contentVersions: {
                Shape: ContentVersionMedia[];
                Name: "ContentVersionMedia";
                Nullable: false;
            };
            contentMedia: {
                Shape: ContentMedia[];
                Name: "ContentMedia";
                Nullable: false;
            };
            featuredIn: {
                Shape: Content[];
                Name: "Content";
                Nullable: false;
            };
        };
    };
    Project: {
        Name: "Project";
        Shape: Project;
        Include: Prisma.ProjectInclude;
        Select: Prisma.ProjectSelect;
        OrderBy: Prisma.ProjectOrderByWithRelationInput;
        WhereUnique: Prisma.ProjectWhereUniqueInput;
        Where: Prisma.ProjectWhereInput;
        Create: {};
        Update: {};
        RelationName: "client" | "sites" | "mobileApps" | "apis" | "pages" | "contents" | "media";
        ListRelations: "sites" | "mobileApps" | "apis" | "pages" | "contents" | "media";
        Relations: {
            client: {
                Shape: Client;
                Name: "Client";
                Nullable: false;
            };
            sites: {
                Shape: Site[];
                Name: "Site";
                Nullable: false;
            };
            mobileApps: {
                Shape: MobileApp[];
                Name: "MobileApp";
                Nullable: false;
            };
            apis: {
                Shape: API[];
                Name: "API";
                Nullable: false;
            };
            pages: {
                Shape: Page[];
                Name: "Page";
                Nullable: false;
            };
            contents: {
                Shape: Content[];
                Name: "Content";
                Nullable: false;
            };
            media: {
                Shape: Media[];
                Name: "Media";
                Nullable: false;
            };
        };
    };
    Site: {
        Name: "Site";
        Shape: Site;
        Include: Prisma.SiteInclude;
        Select: Prisma.SiteSelect;
        OrderBy: Prisma.SiteOrderByWithRelationInput;
        WhereUnique: Prisma.SiteWhereUniqueInput;
        Where: Prisma.SiteWhereInput;
        Create: {};
        Update: {};
        RelationName: "project" | "pages";
        ListRelations: "pages";
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
            pages: {
                Shape: Page[];
                Name: "Page";
                Nullable: false;
            };
        };
    };
    MobileApp: {
        Name: "MobileApp";
        Shape: MobileApp;
        Include: Prisma.MobileAppInclude;
        Select: Prisma.MobileAppSelect;
        OrderBy: Prisma.MobileAppOrderByWithRelationInput;
        WhereUnique: Prisma.MobileAppWhereUniqueInput;
        Where: Prisma.MobileAppWhereInput;
        Create: {};
        Update: {};
        RelationName: "project";
        ListRelations: never;
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
        };
    };
    API: {
        Name: "API";
        Shape: API;
        Include: Prisma.APIInclude;
        Select: Prisma.APISelect;
        OrderBy: Prisma.APIOrderByWithRelationInput;
        WhereUnique: Prisma.APIWhereUniqueInput;
        Where: Prisma.APIWhereInput;
        Create: {};
        Update: {};
        RelationName: "project";
        ListRelations: never;
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: never;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: never;
        ListRelations: never;
        Relations: {};
    };
}
export function getDatamodel(): PothosPrismaDatamodel;