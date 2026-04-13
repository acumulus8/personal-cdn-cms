import { GraphQLError } from 'graphql';
import { MediaType } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('Media', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        url: t.exposeString('url'),
        ownerId: t.exposeInt('ownerId'),
        projectId: t.exposeInt('projectId'),
        filename: t.exposeString('filename', { nullable: true }),
        mimeType: t.exposeString('mimeType', { nullable: true }),
        size: t.exposeInt('size', { nullable: true }),
        width: t.exposeInt('width', { nullable: true }),
        height: t.exposeInt('height', { nullable: true }),
        altText: t.exposeString('altText', { nullable: true }),
        caption: t.exposeString('caption', { nullable: true }),
        type: t.field({
            type: 'String',
            resolve: (media) => media.type,
        }),
        owner: t.relation('owner'),
        project: t.relation('project'),
        contentVersions: t.relation('contentVersions'),
        contentMedia: t.relation('contentMedia'),
        featuredIn: t.relation('featuredIn'),
    }),
});

builder.queryField('medias', (t) =>
    t.prismaField({
        type: ['Media'],
        args: { projectId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.media.findMany({
                ...query,
                ...(args.projectId ? { where: { projectId: args.projectId } } : {}),
            }),
    })
);

builder.queryField('media', (t) =>
    t.prismaField({
        type: 'Media',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.media.findUnique({ ...query, where: { id: args.id } }),
    })
);

const MediaTypeEnum = builder.enumType('MediaType', { values: Object.values(MediaType) });

const CreateMediaInput = builder.inputType('CreateMediaInput', {
    fields: (t) => ({
        url: t.string({ required: true }),
        ownerId: t.int({ required: true }),
        projectId: t.int({ required: true }),
        type: t.field({ type: MediaTypeEnum, required: false }),
        filename: t.string({ required: false }),
        mimeType: t.string({ required: false }),
        size: t.int({ required: false }),
        width: t.int({ required: false }),
        height: t.int({ required: false }),
        altText: t.string({ required: false }),
        caption: t.string({ required: false }),
    }),
});

const UpdateMediaInput = builder.inputType('UpdateMediaInput', {
    fields: (t) => ({
        url: t.string({ required: false }),
        type: t.field({ type: MediaTypeEnum, required: false }),
        filename: t.string({ required: false }),
        mimeType: t.string({ required: false }),
        size: t.int({ required: false }),
        width: t.int({ required: false }),
        height: t.int({ required: false }),
        altText: t.string({ required: false }),
        caption: t.string({ required: false }),
    }),
});

builder.mutationField('createMedia', (t) =>
    t.prismaField({
        type: 'Media',
        args: { input: t.arg({ type: CreateMediaInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { url, ownerId, projectId, type, filename, mimeType, size, width, height, altText, caption } = args.input;
            return prisma.media.create({
                ...query,
                data: {
                    url,
                    ownerId,
                    projectId,
                    type: type ?? MediaType.IMAGE,
                    filename: filename ?? null,
                    mimeType: mimeType ?? null,
                    size: size ?? null,
                    width: width ?? null,
                    height: height ?? null,
                    altText: altText ?? null,
                    caption: caption ?? null,
                },
            });
        },
    })
);

builder.mutationField('updateMedia', (t) =>
    t.prismaField({
        type: 'Media',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateMediaInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { url, type, filename, mimeType, size, width, height, altText, caption } = args.input;
            return prisma.media.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(url !== undefined && url !== null ? { url } : {}),
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(filename !== undefined ? { filename: filename ?? null } : {}),
                    ...(mimeType !== undefined ? { mimeType: mimeType ?? null } : {}),
                    ...(size !== undefined ? { size: size ?? null } : {}),
                    ...(width !== undefined ? { width: width ?? null } : {}),
                    ...(height !== undefined ? { height: height ?? null } : {}),
                    ...(altText !== undefined ? { altText: altText ?? null } : {}),
                    ...(caption !== undefined ? { caption: caption ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteMedia', (t) =>
    t.prismaField({
        type: 'Media',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.media.delete({ ...query, where: { id: args.id } });
        },
    })
);
