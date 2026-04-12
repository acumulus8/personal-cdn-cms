import { GraphQLError } from 'graphql';
import { SectionType, ContainerType, ColumnLayout } from '@prisma/client';
import { builder } from '@/graphql/builder';
import { prisma } from '@/prisma';

builder.prismaObject('Section', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name', { nullable: true }),
        order: t.exposeInt('order'),
        pageId: t.exposeInt('pageId'),
        parentId: t.exposeInt('parentId', { nullable: true }),
        type: t.field({
            type: 'String',
            resolve: (section) => section.type,
        }),
        containerType: t.field({
            type: 'String',
            resolve: (section) => section.containerType,
        }),
        columnLayout: t.field({
            type: 'String',
            nullable: true,
            resolve: (section) => section.columnLayout ?? null,
        }),
        page: t.relation('page'),
        sectionContent: t.relation('sectionContent'),
        subSections: t.relation('subSections'),
        parentSection: t.relation('parentSection', { nullable: true }),
    }),
});

builder.queryField('sections', (t) =>
    t.prismaField({
        type: ['Section'],
        args: { pageId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.section.findMany({
                ...query,
                ...(args.pageId ? { where: { pageId: args.pageId } } : {}),
            }),
    })
);

builder.queryField('section', (t) =>
    t.prismaField({
        type: 'Section',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.section.findUnique({ ...query, where: { id: args.id } }),
    })
);

const SectionTypeEnum = builder.enumType('SectionType', { values: Object.values(SectionType) });
const ContainerTypeEnum = builder.enumType('ContainerType', { values: Object.values(ContainerType) });
const ColumnLayoutEnum = builder.enumType('ColumnLayout', { values: Object.values(ColumnLayout) });

const CreateSectionInput = builder.inputType('CreateSectionInput', {
    fields: (t) => ({
        pageId: t.int({ required: true }),
        type: t.field({ type: SectionTypeEnum, required: true }),
        name: t.string({ required: false }),
        order: t.int({ required: false }),
        containerType: t.field({ type: ContainerTypeEnum, required: false }),
        columnLayout: t.field({ type: ColumnLayoutEnum, required: false }),
        parentId: t.int({ required: false }),
    }),
});

const UpdateSectionInput = builder.inputType('UpdateSectionInput', {
    fields: (t) => ({
        type: t.field({ type: SectionTypeEnum, required: false }),
        name: t.string({ required: false }),
        order: t.int({ required: false }),
        containerType: t.field({ type: ContainerTypeEnum, required: false }),
        columnLayout: t.field({ type: ColumnLayoutEnum, required: false }),
        parentId: t.int({ required: false }),
    }),
});

builder.mutationField('createSection', (t) =>
    t.prismaField({
        type: 'Section',
        args: { input: t.arg({ type: CreateSectionInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { pageId, type, name, order, containerType, columnLayout, parentId } = args.input;
            return prisma.section.create({
                ...query,
                data: {
                    pageId,
                    type,
                    name: name ?? null,
                    order: order ?? 0,
                    containerType: containerType ?? ContainerType.FULL,
                    columnLayout: columnLayout ?? null,
                    parentId: parentId ?? null,
                },
            });
        },
    })
);

builder.mutationField('updateSection', (t) =>
    t.prismaField({
        type: 'Section',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateSectionInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { type, name, order, containerType, columnLayout, parentId } = args.input;
            return prisma.section.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(type !== undefined && type !== null ? { type } : {}),
                    ...(name !== undefined ? { name: name ?? null } : {}),
                    ...(order !== undefined && order !== null ? { order } : {}),
                    ...(containerType !== undefined && containerType !== null ? { containerType } : {}),
                    ...(columnLayout !== undefined ? { columnLayout: columnLayout ?? null } : {}),
                    ...(parentId !== undefined ? { parentId: parentId ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteSection', (t) =>
    t.prismaField({
        type: 'Section',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.section.delete({ ...query, where: { id: args.id } });
        },
    })
);
