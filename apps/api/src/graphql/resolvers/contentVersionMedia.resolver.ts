import { GraphQLError } from 'graphql';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('ContentVersionMedia', {
    fields: (t) => ({
        contentVersionId: t.exposeInt('contentVersionId'),
        mediaId: t.exposeInt('mediaId'),
        order: t.exposeInt('order'),
        contentVersion: t.relation('contentVersion'),
        media: t.relation('media'),
    }),
});

builder.queryField('contentVersionMedias', (t) =>
    t.prismaField({
        type: ['ContentVersionMedia'],
        args: { contentVersionId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.contentVersionMedia.findMany({
                ...query,
                ...(args.contentVersionId ? { where: { contentVersionId: args.contentVersionId } } : {}),
                orderBy: { order: 'asc' },
            }),
    })
);

builder.queryField('contentVersionMedia', (t) =>
    t.prismaField({
        type: 'ContentVersionMedia',
        nullable: true,
        args: {
            contentVersionId: t.arg.int({ required: true }),
            mediaId: t.arg.int({ required: true }),
        },
        resolve: (query, _root, args) =>
            prisma.contentVersionMedia.findUnique({
                ...query,
                where: {
                    contentVersionId_mediaId: {
                        contentVersionId: args.contentVersionId,
                        mediaId: args.mediaId,
                    },
                },
            }),
    })
);

const CreateContentVersionMediaInput = builder.inputType('CreateContentVersionMediaInput', {
    fields: (t) => ({
        contentVersionId: t.int({ required: true }),
        mediaId: t.int({ required: true }),
        order: t.int({ required: false }),
    }),
});

builder.mutationField('createContentVersionMedia', (t) =>
    t.prismaField({
        type: 'ContentVersionMedia',
        args: { input: t.arg({ type: CreateContentVersionMediaInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { contentVersionId, mediaId, order } = args.input;
            return prisma.contentVersionMedia.create({
                ...query,
                data: {
                    contentVersionId,
                    mediaId,
                    order: order ?? 0,
                },
            });
        },
    })
);

builder.mutationField('updateContentVersionMediaOrder', (t) =>
    t.prismaField({
        type: 'ContentVersionMedia',
        args: {
            contentVersionId: t.arg.int({ required: true }),
            mediaId: t.arg.int({ required: true }),
            order: t.arg.int({ required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.contentVersionMedia.update({
                ...query,
                where: {
                    contentVersionId_mediaId: {
                        contentVersionId: args.contentVersionId,
                        mediaId: args.mediaId,
                    },
                },
                data: { order: args.order },
            });
        },
    })
);

builder.mutationField('deleteContentVersionMedia', (t) =>
    t.prismaField({
        type: 'ContentVersionMedia',
        args: {
            contentVersionId: t.arg.int({ required: true }),
            mediaId: t.arg.int({ required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.contentVersionMedia.delete({
                ...query,
                where: {
                    contentVersionId_mediaId: {
                        contentVersionId: args.contentVersionId,
                        mediaId: args.mediaId,
                    },
                },
            });
        },
    })
);
