import { GraphQLError } from 'graphql';
import { APIType } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('API', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    slug: t.exposeString('slug'),
    description: t.exposeString('description', { nullable: true }),
    type: t.field({
      type: 'String',
      resolve: (api) => api.type,
    }),
    projectId: t.exposeInt('projectId'),
    createdAt: t.field({ type: 'String', resolve: (api) => api.createdAt.toISOString() }),
    updatedAt: t.field({ type: 'String', resolve: (api) => api.updatedAt.toISOString() }),
    project: t.relation('project'),
  }),
});

builder.queryField('apis', (t) =>
    t.prismaField({
        type: ['API'],
        args: { projectId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.aPI.findMany({
                ...query,
                ...(args.projectId ? { where: { projectId: args.projectId } } : {}),
            }),
    })
);

builder.queryField('api', (t) =>
    t.prismaField({
        type: 'API',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.aPI.findUnique({ ...query, where: { id: args.id } }),
    })
);

const APITypeEnum = builder.enumType('APIType', { values: Object.values(APIType) });

const CreateAPIInput = builder.inputType('CreateAPIInput', {
    fields: (t) => ({
        name: t.string({ required: true }),
        slug: t.string({ required: true }),
        projectId: t.int({ required: true }),
        type: t.field({ type: APITypeEnum, required: false }),
        description: t.string({ required: false }),
    }),
});

const UpdateAPIInput = builder.inputType('UpdateAPIInput', {
    fields: (t) => ({
        name: t.string({ required: false }),
        slug: t.string({ required: false }),
        type: t.field({ type: APITypeEnum, required: false }),
        description: t.string({ required: false }),
    }),
});

builder.mutationField('createAPI', (t) =>
    t.prismaField({
        type: 'API',
        args: { input: t.arg({ type: CreateAPIInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, projectId, type, description } = args.input;
            return prisma.aPI.create({
                ...query,
                data: {
                    name,
                    slug,
                    projectId,
                    type: type ?? APIType.CDN,
                    description: description ?? null,
                },
            });
        },
    })
);

builder.mutationField('updateAPI', (t) =>
    t.prismaField({
        type: 'API',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateAPIInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, type, description } = args.input;
            return prisma.aPI.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(name !== undefined && name !== null ? { name } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(description !== undefined ? { description: description ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteAPI', (t) =>
    t.prismaField({
        type: 'API',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.aPI.delete({ ...query, where: { id: args.id } });
        },
    })
);
