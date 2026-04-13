import { GraphQLError } from 'graphql';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('Page', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        title: t.exposeString('title'),
        slug: t.exposeString('slug'),
        projectId: t.exposeInt('projectId'),
        siteId: t.exposeInt('siteId'),
        parentId: t.exposeInt('parentId', { nullable: true }),
        metaTitle: t.exposeString('metaTitle', { nullable: true }),
        metaDescription: t.exposeString('metaDescription', { nullable: true }),
        ogImage: t.exposeString('ogImage', { nullable: true }),
        keywords: t.exposeString('keywords', { nullable: true }),
        project: t.relation('project'),
        site: t.relation('site'),
        sections: t.relation('sections'),
        subPages: t.relation('subPages'),
        parentPage: t.relation('parentPage', { nullable: true }),
    }),
});

builder.queryField('pages', (t) =>
    t.prismaField({
        type: ['Page'],
        resolve: (query) => prisma.page.findMany({ ...query }),
    })
);

builder.queryField('pagesBySite', (t) =>
    t.prismaField({
        type: ['Page'],
        args: { siteId: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.page.findMany({ ...query, where: { siteId: args.siteId } }),
    })
);

builder.queryField('page', (t) =>
    t.prismaField({
        type: 'Page',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.page.findUnique({ ...query, where: { id: args.id } }),
    })
);

const CreatePageInput = builder.inputType('CreatePageInput', {
    fields: (t) => ({
        title: t.string({ required: true }),
        slug: t.string({ required: true }),
        projectId: t.int({ required: true }),
        siteId: t.int({ required: true }),
        parentId: t.int({ required: false }),
        metaTitle: t.string({ required: false }),
        metaDescription: t.string({ required: false }),
        ogImage: t.string({ required: false }),
        keywords: t.string({ required: false }),
    }),
});

const UpdatePageInput = builder.inputType('UpdatePageInput', {
    fields: (t) => ({
        title: t.string({ required: false }),
        slug: t.string({ required: false }),
        parentId: t.int({ required: false }),
        metaTitle: t.string({ required: false }),
        metaDescription: t.string({ required: false }),
        ogImage: t.string({ required: false }),
        keywords: t.string({ required: false }),
    }),
});

builder.mutationField('createPage', (t) =>
    t.prismaField({
        type: 'Page',
        args: { input: t.arg({ type: CreatePageInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { title, slug, projectId, siteId, parentId, metaTitle, metaDescription, ogImage, keywords } = args.input;
            return prisma.page.create({
                ...query,
                data: {
                    title,
                    slug,
                    projectId,
                    siteId,
                    parentId: parentId ?? null,
                    metaTitle: metaTitle ?? null,
                    metaDescription: metaDescription ?? null,
                    ogImage: ogImage ?? null,
                    keywords: keywords ?? null,
                },
            });
        },
    })
);

builder.mutationField('updatePage', (t) =>
    t.prismaField({
        type: 'Page',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdatePageInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { title, slug, parentId, metaTitle, metaDescription, ogImage, keywords } = args.input;
            return prisma.page.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(title !== undefined && title !== null ? { title } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(parentId !== undefined ? { parentId: parentId ?? null } : {}),
                    ...(metaTitle !== undefined ? { metaTitle: metaTitle ?? null } : {}),
                    ...(metaDescription !== undefined ? { metaDescription: metaDescription ?? null } : {}),
                    ...(ogImage !== undefined ? { ogImage: ogImage ?? null } : {}),
                    ...(keywords !== undefined ? { keywords: keywords ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deletePage', (t) =>
    t.prismaField({
        type: 'Page',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.page.delete({ ...query, where: { id: args.id } });
        },
    })
);
