import { GraphQLError } from 'graphql';
import { SiteType } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from "@/prisma";

builder.prismaObject('Site', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name'),
        domain: t.exposeString('domain'),
        slug: t.exposeString('slug'),
        host: t.exposeString('host'),
        description: t.exposeString('description', { nullable: true }),
        type: t.field({
            type: 'String',
            resolve: (site) => site.type,
        }),
        projectId: t.exposeInt('projectId'),
        pages: t.relation('pages'),
    }),
});

builder.queryField('sites', (t) =>
    t.prismaField({
        type: ['Site'],
        resolve: (query) => prisma.site.findMany({ ...query }),
    })
);

builder.queryField('site', (t) =>
    t.prismaField({
        type: 'Site',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.site.findUnique({ ...query, where: { id: args.id } }),
    })
);

const SiteTypeEnum = builder.enumType('SiteType', { values: Object.values(SiteType) });

const CreateSiteInput = builder.inputType('CreateSiteInput', {
    fields: (t) => ({
        name: t.string({ required: true }),
        domain: t.string({ required: true }),
        slug: t.string({ required: true }),
        host: t.string({ required: true }),
        description: t.string({ required: false }),
        type: t.field({ type: SiteTypeEnum, required: false }),
        projectId: t.int({ required: true }),
        clientId: t.int({ required: true }),
    }),
});

builder.mutationField('createSite', (t) =>
    t.prismaField({
        type: 'Site',
        nullable: false,
        args: { input: t.arg({ type: CreateSiteInput, required: true }) },
        resolve: (query, _root, args) => {
            const { name, domain, slug, host, description, type, projectId } = args.input;
            return prisma.site.create({
                ...query,
                data: {
                    name,
                    domain,
                    slug,
                    host,
                    description: description ?? null,
                    type: type ?? SiteType.PORTFOLIO,
                    projectId,
                },
            });
        },
    })
);

const UpdateSiteInput = builder.inputType('UpdateSiteInput', {
    fields: (t) => ({
        name: t.string({ required: false }),
        domain: t.string({ required: false }),
        slug: t.string({ required: false }),
        host: t.string({ required: false }),
        description: t.string({ required: false }),
        type: t.field({ type: SiteTypeEnum, required: false }),
    }),
});

builder.mutationField('updateSite', (t) =>
    t.prismaField({
        type: 'Site',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateSiteInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, domain, slug, host, description, type } = args.input;
            return prisma.site.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(name !== undefined && name !== null ? { name } : {}),
                    ...(domain !== undefined && domain !== null ? { domain } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(host !== undefined && host !== null ? { host } : {}),
                    ...(description !== undefined ? { description: description ?? null } : {}),
                    ...(type !== undefined && type !== null ? { type } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteSite', (t) =>
    t.prismaField({
        type: 'Site',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.site.delete({ ...query, where: { id: args.id } });
        },
    })
);