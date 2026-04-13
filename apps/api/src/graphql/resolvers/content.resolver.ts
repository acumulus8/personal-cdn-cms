import { GraphQLError } from 'graphql';
import { ContentType, ContentState, ContentVisibility } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('Content', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        slug: t.exposeString('slug', { nullable: true }),
        title: t.exposeString('title', { nullable: true }),
        projectId: t.exposeInt('projectId'),
        featuredMediaId: t.exposeInt('featuredMediaId', { nullable: true }),
        type: t.field({
            type: 'String',
            resolve: (content) => content.type,
        }),
        state: t.field({
            type: 'String',
            resolve: (content) => content.state,
        }),
        visibility: t.field({
            type: 'String',
            resolve: (content) => content.visibility,
        }),
        project: t.relation('project'),
        versions: t.relation('versions'),
        sectionContents: t.relation('sectionContents'),
        media: t.relation('media'),
        featuredMedia: t.relation('featuredMedia', { nullable: true }),
    }),
});

builder.queryField('contents', (t) =>
    t.prismaField({
        type: ['Content'],
        args: { projectId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.content.findMany({
                ...query,
                ...(args.projectId ? { where: { projectId: args.projectId } } : {}),
            }),
    })
);

builder.queryField('content', (t) =>
    t.prismaField({
        type: 'Content',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.content.findUnique({ ...query, where: { id: args.id } }),
    })
);

const ContentTypeEnum = builder.enumType('ContentType', { values: Object.values(ContentType) });
const ContentStateEnum = builder.enumType('ContentState', { values: Object.values(ContentState) });
const ContentVisibilityEnum = builder.enumType('ContentVisibility', { values: Object.values(ContentVisibility) });

const CreateContentInput = builder.inputType('CreateContentInput', {
    fields: (t) => ({
        projectId: t.int({ required: true }),
        type: t.field({ type: ContentTypeEnum, required: false }),
        state: t.field({ type: ContentStateEnum, required: false }),
        visibility: t.field({ type: ContentVisibilityEnum, required: false }),
        slug: t.string({ required: false }),
        title: t.string({ required: false }),
        featuredMediaId: t.int({ required: false }),
    }),
});

const UpdateContentInput = builder.inputType('UpdateContentInput', {
    fields: (t) => ({
        type: t.field({ type: ContentTypeEnum, required: false }),
        state: t.field({ type: ContentStateEnum, required: false }),
        visibility: t.field({ type: ContentVisibilityEnum, required: false }),
        slug: t.string({ required: false }),
        title: t.string({ required: false }),
        featuredMediaId: t.int({ required: false }),
    }),
});

builder.mutationField('createContent', (t) =>
    t.prismaField({
        type: 'Content',
        args: { input: t.arg({ type: CreateContentInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { projectId, type, state, visibility, slug, title, featuredMediaId } = args.input;
            return prisma.content.create({
                ...query,
                data: {
                    projectId,
                    type: type ?? ContentType.POST,
                    state: state ?? ContentState.DRAFT,
                    visibility: visibility ?? ContentVisibility.HIDDEN,
                    slug: slug ?? null,
                    title: title ?? null,
                    featuredMediaId: featuredMediaId ?? null,
                },
            });
        },
    })
);

builder.mutationField('updateContent', (t) =>
    t.prismaField({
        type: 'Content',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateContentInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { type, state, visibility, slug, title, featuredMediaId } = args.input;
            return prisma.content.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(state !== undefined && state !== null ? { state } : {}),
                    ...(visibility !== undefined && visibility !== null ? { visibility } : {}),
                    ...(slug !== undefined ? { slug: slug ?? null } : {}),
                    ...(title !== undefined ? { title: title ?? null } : {}),
                    ...(featuredMediaId !== undefined ? { featuredMediaId: featuredMediaId ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteContent', (t) =>
    t.prismaField({
        type: 'Content',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.content.delete({ ...query, where: { id: args.id } });
        },
    })
);
