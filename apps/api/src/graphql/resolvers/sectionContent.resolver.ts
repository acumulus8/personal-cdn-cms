import { GraphQLError } from 'graphql';
import { SectionContentType } from '@prisma/client';
import {builder} from '../builder';
import { prisma } from '@/prisma';

builder.prismaObject('SectionContent', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        contentId: t.exposeInt('contentId'),
        sectionId: t.exposeInt('sectionId'),
        type: t.field({
            type: 'String',
            resolve: (sc) => sc.type,
        }),
        content: t.relation('content'),
        section: t.relation('section'),
    }),
});

builder.queryField('sectionContents', (t) =>
    t.prismaField({
        type: ['SectionContent'],
        args: { sectionId: t.arg.int({ required: false }) },
        resolve: (query, _root, args) =>
            prisma.sectionContent.findMany({
                ...query,
                ...(args.sectionId ? { where: { sectionId: args.sectionId } } : {}),
            }),
    })
);

builder.queryField('sectionContent', (t) =>
    t.prismaField({
        type: 'SectionContent',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args) =>
            prisma.sectionContent.findUnique({ ...query, where: { id: args.id } }),
    })
);

const SectionContentTypeEnum = builder.enumType('SectionContentType', { values: Object.values(SectionContentType) });

const CreateSectionContentInput = builder.inputType('CreateSectionContentInput', {
    fields: (t) => ({
        sectionId: t.int({ required: true }),
        contentId: t.int({ required: true }),
        type: t.field({ type: SectionContentTypeEnum, required: false }),
    }),
});

const UpdateSectionContentInput = builder.inputType('UpdateSectionContentInput', {
    fields: (t) => ({
        type: t.field({ type: SectionContentTypeEnum, required: true }),
    }),
});

builder.mutationField('createSectionContent', (t) =>
    t.prismaField({
        type: 'SectionContent',
        args: { input: t.arg({ type: CreateSectionContentInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { sectionId, contentId, type } = args.input;
            return prisma.sectionContent.create({
                ...query,
                data: {
                    sectionId,
                    contentId,
                    type: type ?? SectionContentType.TEXT,
                },
            });
        },
    })
);

builder.mutationField('updateSectionContent', (t) =>
    t.prismaField({
        type: 'SectionContent',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateSectionContentInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.sectionContent.update({
                ...query,
                where: { id: args.id },
                data: { type: args.input.type },
            });
        },
    })
);

builder.mutationField('deleteSectionContent', (t) =>
    t.prismaField({
        type: 'SectionContent',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.sectionContent.delete({ ...query, where: { id: args.id } });
        },
    })
);
