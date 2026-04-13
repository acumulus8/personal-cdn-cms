import './resolvers/project.resolver';
import './resolvers/client.resolver';
import './resolvers/site.resolver';
import './resolvers/api.resolver';
import './resolvers/mobileApp.resolver';
import './resolvers/page.resolver';
import './resolvers/section.resolver';
import './resolvers/content.resolver';
import './resolvers/sectionContent.resolver';
import './resolvers/media.resolver';
import './resolvers/contentMedia.resolver';
import './resolvers/contentVersion.resolver';
import './resolvers/contentVersionMedia.resolver';
import { builder } from './builder';

export const schema = builder.toSchema();
