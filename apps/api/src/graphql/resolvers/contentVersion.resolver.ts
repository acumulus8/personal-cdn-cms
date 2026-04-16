import { GraphQLError } from 'graphql';
import { ContentState, ContentVisibility } from '@prisma/client';
import { builder } from '../builder';
import { ContentStateEnum, ContentVisibilityEnum } from './content.resolver';
import { prisma } from '@/prisma';

builder.prismaObject('ContentVersion', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        contentId: t.exposeInt('contentId'),
        version: t.exposeInt('version'),
        title: t.exposeString('title', { nullable: true }),
        excerpt: t.exposeString('excerpt', { nullable: true }),
        body: t.field({
            type: 'String',
            nullable: true,
            resolve: (cv) => (cv.body !== null ? JSON.stringify(cv.body) : null),
        }),
        state: t.field({
            type: 'String',
            resolve: (cv) => cv.state,
        }),
        visibility: t.field({
            type: 'String',
            resolve: (cv) => cv.visibility,
        }),
        content: t.relation('content'),
        media: t.relation('media'),
    }),
});

builder.queryField('contentVersions', (t) =>
    t.prismaField({
        type: ['ContentVersion'],
        args: { contentId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.contentVersion.findMany({
                ...query,
                ...(args.contentId ? { where: { contentId: args.contentId } } : {}),
                orderBy: { version: 'asc' },
            }),
    })
);

builder.queryField('contentVersion', (t) =>
    t.prismaField({
        type: 'ContentVersion',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.contentVersion.findUnique({ ...query, where: { id: args.id } }),
    })
);

const CreateContentVersionInput = builder.inputType('CreateContentVersionInput', {
    fields: (t) => ({
        contentId: t.int({ required: true }),
        title: t.string({ required: false }),
        excerpt: t.string({ required: false }),
        body: t.string({ required: false }),
        state: t.field({ type: ContentStateEnum, required: false }),
        visibility: t.field({ type: ContentVisibilityEnum, required: false }),
    }),
});

const UpdateContentVersionInput = builder.inputType('UpdateContentVersionInput', {
    fields: (t) => ({
        title: t.string({ required: false }),
        excerpt: t.string({ required: false }),
        body: t.string({ required: false }),
        state: t.field({ type: ContentStateEnum, required: false }),
        visibility: t.field({ type: ContentVisibilityEnum, required: false }),
    }),
});

builder.mutationField('createContentVersion', (t) =>
    t.prismaField({
        type: 'ContentVersion',
        args: { input: t.arg({ type: CreateContentVersionInput, required: true }) },
        resolve: async (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { contentId, title, excerpt, body, state, visibility } = args.input;

            const latest = await prisma.contentVersion.findFirst({
                where: { contentId },
                orderBy: { version: 'desc' },
                select: { version: true },
            });

            return prisma.contentVersion.create({
                ...query,
                data: {
                    contentId,
                    version: (latest?.version ?? 0) + 1,
                    title: title ?? null,
                    excerpt: excerpt ?? null,
                    body: body ? JSON.parse(body) : null,
                    state: state ?? ContentState.DRAFT,
                    visibility: visibility ?? ContentVisibility.HIDDEN,
                },
            });
        },
    })
);

builder.mutationField('updateContentVersion', (t) =>
    t.prismaField({
        type: 'ContentVersion',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateContentVersionInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { title, excerpt, body, state, visibility } = args.input;
            return prisma.contentVersion.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(title !== undefined ? { title: title ?? null } : {}),
                    ...(excerpt !== undefined ? { excerpt: excerpt ?? null } : {}),
                    ...(body !== undefined ? { body: body ? JSON.parse(body) : null } : {}),
                    ...(state !== undefined && state !== null ? { state } : {}),
                    ...(visibility !== undefined && visibility !== null ? { visibility } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteContentVersion', (t) =>
    t.prismaField({
        type: 'ContentVersion',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.contentVersion.delete({ ...query, where: { id: args.id } });
        },
    })
);
