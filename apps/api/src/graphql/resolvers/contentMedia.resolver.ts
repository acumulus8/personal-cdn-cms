import { GraphQLError } from 'graphql';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('ContentMedia', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        contentId: t.exposeInt('contentId'),
        mediaId: t.exposeInt('mediaId'),
        order: t.exposeInt('order'),
        content: t.relation('content'),
        media: t.relation('media'),
    }),
});

builder.queryField('contentMedias', (t) =>
    t.prismaField({
        type: ['ContentMedia'],
        args: { contentId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.contentMedia.findMany({
                ...query,
                ...(args.contentId ? { where: { contentId: args.contentId } } : {}),
                orderBy: { order: 'asc' },
            }),
    })
);

builder.queryField('contentMedia', (t) =>
    t.prismaField({
        type: 'ContentMedia',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.contentMedia.findUnique({ ...query, where: { id: args.id } }),
    })
);

const CreateContentMediaInput = builder.inputType('CreateContentMediaInput', {
    fields: (t) => ({
        contentId: t.int({ required: true }),
        mediaId: t.int({ required: true }),
        order: t.int({ required: false }),
    }),
});

builder.mutationField('createContentMedia', (t) =>
    t.prismaField({
        type: 'ContentMedia',
        args: { input: t.arg({ type: CreateContentMediaInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { contentId, mediaId, order } = args.input;
            return prisma.contentMedia.create({
                ...query,
                data: {
                    contentId,
                    mediaId,
                    order: order ?? 0,
                },
            });
        },
    })
);

builder.mutationField('updateContentMediaOrder', (t) =>
    t.prismaField({
        type: 'ContentMedia',
        args: {
            id: t.arg.int({ required: true }),
            order: t.arg.int({ required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.contentMedia.update({
                ...query,
                where: { id: args.id },
                data: { order: args.order },
            });
        },
    })
);

builder.mutationField('deleteContentMedia', (t) =>
    t.prismaField({
        type: 'ContentMedia',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.contentMedia.delete({ ...query, where: { id: args.id } });
        },
    })
);
