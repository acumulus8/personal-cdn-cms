import { GraphQLError } from 'graphql';
import { MobileAppPlatform, MobileAppType, MobileAppCategory } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('MobileApp', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
    description: t.exposeString('description', { nullable: true }),
    platform: t.field({
      type: 'String',
      resolve: (app) => app.platform,
    }),
    type: t.field({
      type: 'String',
      resolve: (app) => app.type,
    }),
    category: t.field({
      type: 'String',
      resolve: (app) => app.category,
    }),
    projectId: t.exposeInt('projectId'),
    createdAt: t.field({ type: 'String', resolve: (app) => app.createdAt.toISOString() }),
    updatedAt: t.field({ type: 'String', resolve: (app) => app.updatedAt.toISOString() }),
    project: t.relation('project'),
    pages: t.relation('pages'),
  }),
});

builder.queryField('mobileApps', (t) =>
    t.prismaField({
        type: ['MobileApp'],
        args: { projectId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.mobileApp.findMany({
                ...query,
                ...(args.projectId ? { where: { projectId: args.projectId } } : {}),
            }),
    })
);

builder.queryField('mobileApp', (t) =>
    t.prismaField({
        type: 'MobileApp',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.mobileApp.findUnique({ ...query, where: { id: args.id } }),
    })
);

const MobileAppPlatformEnum = builder.enumType('MobileAppPlatform', { values: Object.values(MobileAppPlatform) });
const MobileAppTypeEnum = builder.enumType('MobileAppType', { values: Object.values(MobileAppType) });
const MobileAppCategoryEnum = builder.enumType('MobileAppCategory', { values: Object.values(MobileAppCategory) });

const CreateMobileAppInput = builder.inputType('CreateMobileAppInput', {
    fields: (t) => ({
        name: t.string({ required: true }),
        slug: t.string({ required: true }),
        projectId: t.int({ required: true }),
        platform: t.field({ type: MobileAppPlatformEnum, required: false }),
        type: t.field({ type: MobileAppTypeEnum, required: false }),
        category: t.field({ type: MobileAppCategoryEnum, required: false }),
        description: t.string({ required: false }),
    }),
});

const UpdateMobileAppInput = builder.inputType('UpdateMobileAppInput', {
    fields: (t) => ({
        name: t.string({ required: false }),
        slug: t.string({ required: false }),
        platform: t.field({ type: MobileAppPlatformEnum, required: false }),
        type: t.field({ type: MobileAppTypeEnum, required: false }),
        category: t.field({ type: MobileAppCategoryEnum, required: false }),
        description: t.string({ required: false }),
    }),
});

builder.mutationField('createMobileApp', (t) =>
    t.prismaField({
        type: 'MobileApp',
        args: { input: t.arg({ type: CreateMobileAppInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, projectId, platform, type, category, description } = args.input;
            return prisma.mobileApp.create({
                ...query,
                data: {
                    name,
                    slug,
                    projectId,
                    platform: platform ?? MobileAppPlatform.ANDROID,
                    type: type ?? MobileAppType.PORTFOLIO,
                    category: category ?? MobileAppCategory.GAMES,
                    description: description ?? null,
                },
            });
        },
    })
);

builder.mutationField('updateMobileApp', (t) =>
    t.prismaField({
        type: 'MobileApp',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateMobileAppInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, platform, type, category, description } = args.input;
            return prisma.mobileApp.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(name !== undefined && name !== null ? { name } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(platform !== undefined && platform !== null ? { platform } : {}),
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(category !== undefined && category !== null ? { category } : {}),
                    ...(description !== undefined ? { description: description ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteMobileApp', (t) =>
    t.prismaField({
        type: 'MobileApp',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.mobileApp.delete({ ...query, where: { id: args.id } });
        },
    })
);