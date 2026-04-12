import '@/graphql/resolvers/project.resolver';
import '@/graphql/resolvers/client.resolver';
import '@/graphql/resolvers/site.resolver';
import '@/graphql/resolvers/api.resolver';
import '@/graphql/resolvers/mobileApp.resolver';
import '@/graphql/resolvers/page.resolver';
import '@/graphql/resolvers/section.resolver';
import '@/graphql/resolvers/content.resolver';
import '@/graphql/resolvers/sectionContent.resolver';
import '@/graphql/resolvers/media.resolver';
import '@/graphql/resolvers/contentMedia.resolver';
import '@/graphql/resolvers/contentVersion.resolver';
import '@/graphql/resolvers/contentVersionMedia.resolver';
import { builder } from './builder';

export const schema = builder.toSchema();
