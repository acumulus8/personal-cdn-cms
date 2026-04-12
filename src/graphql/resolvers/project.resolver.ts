import { GraphQLError } from 'graphql';
import { ProjectType, ProjectStatus } from '@prisma/client';
import { builder } from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('Project', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name'),
        slug: t.exposeString('slug'),
        description: t.exposeString('description', { nullable: true }),
        type: t.field({
            type: 'String',
            resolve: (project) => project.type,
        }),
        status: t.field({
            type: 'String',
            resolve: (project) => project.status,
        }),
        clientId: t.exposeInt('clientId', { nullable: true }),
        sites: t.relation('sites', { nullable: true }),
        apis: t.relation('apis', { nullable: true }),
        mobileApps: t.relation('mobileApps', { nullable: true }),
    }),
});

builder.queryField('projects', (t) =>
    t.prismaField({
        type: ['Project'],
        resolve: (query) => prisma.project.findMany({ ...query }),
    })
);

builder.queryField('project', (t) =>
    t.prismaField({
        type: 'Project',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.project.findUnique({ ...query, where: { id: args.id } }),
    })
);

const ProjectTypeEnum = builder.enumType('ProjectType', { values: Object.values(ProjectType) });
const ProjectStatusEnum = builder.enumType('ProjectStatus', { values: Object.values(ProjectStatus) });

const CreateProjectInput = builder.inputType('CreateProjectInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    clientId: t.int({ required: true }),
    slug: t.string({ required: true }),
    type: t.field({ type: ProjectTypeEnum, required: true }),
    description: t.string({ required: false }),
    status: t.field({ type: ProjectStatusEnum, required: true})
  }),
});

builder.mutationField('createProject', (t) =>
    t.prismaField({
      type: 'Project',
      args: { input: t.arg({ type: CreateProjectInput, required: true }) },
      resolve: (query, _root, args, ctx) => {
        if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
        const { clientId, slug, type, name, description, status } = args.input;
        return prisma.project.create({
          ...query,
          data: {
            slug,
            clientId,
            type,
            name,
            description: description ?? null,
            status
          },
        });
      },
    })
);

const UpdateProjectInput = builder.inputType('UpdateProjectInput', {
    fields: (t) => ({
        name: t.string({ required: false }),
        slug: t.string({ required: false }),
        type: t.field({ type: ProjectTypeEnum, required: false }),
        description: t.string({ required: false }),
        status: t.field({ type: ProjectStatusEnum, required: false }),
    }),
});

builder.mutationField('updateProject', (t) =>
    t.prismaField({
        type: 'Project',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateProjectInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, type, description, status } = args.input;
            return prisma.project.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(name !== undefined && name !== null ? { name } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(description !== undefined ? { description: description ?? null } : {}),
                    ...(status !== undefined && status !== null ? { status } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteProject', (t) =>
    t.prismaField({
        type: 'Project',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.project.delete({ ...query, where: { id: args.id } });
        },
    })
);
