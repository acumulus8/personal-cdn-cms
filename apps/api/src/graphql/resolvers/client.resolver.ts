import { GraphQLError } from 'graphql';
import { builder } from '../builder';
import { Prisma } from '@prisma/client';
import { prisma } from '@/prisma';

builder.prismaObject('Address', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        address1: t.exposeString('address1'),
        address2: t.exposeString('address2'),
        city: t.exposeString('city'),
        state: t.exposeString('state'),
        zipCode: t.exposeString('zipCode'),
        country: t.exposeString('country'),
    }),
});

builder.prismaObject('Client', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        name: t.exposeString('name'),
        slug: t.exposeString('slug'),
        email: t.exposeString('email'),
        phone: t.exposeString('phone'),
        description: t.exposeString('description', { nullable: true }),
        projects: t.relation('projects'),
        addresses: t.relation('addresses'),
    }),
});

builder.queryField('clients', (t) =>
    t.prismaField({
        type: ['Client'],
        resolve: (query, _root, _args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.client.findMany({ ...query });
        },
    })
);

builder.queryField('client', (t) =>
    t.prismaField({
        type: 'Client',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.client.findUnique({ ...query, where: { id: args.id } });
        },
    })
);

const CreateClientInput = builder.inputType('CreateClientInput', {
    fields: (t) => ({
        name: t.string({ required: true }),
        slug: t.string({ required: true }),
        email: t.string({ required: true}),
        phone: t.string({ required: true }),
        description: t.string(),
    }),
});

builder.mutationField('createClient', (t) =>
    t.prismaField({
        type: 'Client',
        args: { input: t.arg({ type: CreateClientInput, required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, email, phone, description } = args.input;
            return prisma.client.create({
                ...query,
                data: {
                    name,
                    slug,
                    email,
                    phone,
                    ...(description != null ? { description } : {}),
                },
            });
        },
    })
);

const CreateClientAddressInput = builder.inputType('CreateClientAddressInput', {
    fields: (t) => ({
        address1: t.string({ required: true }),
        address2: t.string({ required: false}),
        city: t.string({ required: true }),
        state: t.string({ required: true }),
        zipCode: t.string({ required: true }),
        country: t.string({ required: true }),
        clientId: t.int({ required: true }),
    }),
});

builder.mutationField('createClientAddress', (t) =>
    t.prismaField({
      type: 'Address',
      args: { input: t.arg({ type: CreateClientAddressInput, required: true }) },
      resolve: (query, _root, args, ctx) => {
        if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
        const { clientId, ...rest } = args.input;
        const data: Prisma.AddressCreateInput = {
          ...rest,
          address2: rest.address2 ?? '',
          clients: { connect: { id: clientId } }
        };
        return prisma.address.create({ ...query, data });
      },
    }));

builder.queryField('addresses', (t) =>
    t.prismaField({
        type: ['Address'],
        args: { clientId: t.arg.int({ required: false }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.address.findMany({
                ...query,
                ...(args.clientId ? { where: { clients: { some: { id: args.clientId } } } } : {}),
            });
        },
    })
);

builder.queryField('address', (t) =>
    t.prismaField({
        type: 'Address',
        nullable: true,
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.address.findUnique({ ...query, where: { id: args.id } });
        },
    })
);

const UpdateClientInput = builder.inputType('UpdateClientInput', {
    fields: (t) => ({
        name: t.string({ required: false }),
        slug: t.string({ required: false }),
        email: t.string({ required: false }),
        phone: t.string({ required: false }),
        description: t.string({ required: false }),
    }),
});

builder.mutationField('updateClient', (t) =>
    t.prismaField({
        type: 'Client',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateClientInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { name, slug, email, phone, description } = args.input;
            return prisma.client.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(name !== undefined && name !== null ? { name } : {}),
                    ...(slug !== undefined && slug !== null ? { slug } : {}),
                    ...(email !== undefined && email !== null ? { email } : {}),
                    ...(phone !== undefined && phone !== null ? { phone } : {}),
                    ...(description !== undefined ? { description: description ?? null } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteClient', (t) =>
    t.prismaField({
        type: 'Client',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.client.delete({ ...query, where: { id: args.id } });
        },
    })
);

const UpdateAddressInput = builder.inputType('UpdateAddressInput', {
    fields: (t) => ({
        address1: t.string({ required: false }),
        address2: t.string({ required: false }),
        city: t.string({ required: false }),
        state: t.string({ required: false }),
        zipCode: t.string({ required: false }),
        country: t.string({ required: false }),
    }),
});

builder.mutationField('updateAddress', (t) =>
    t.prismaField({
        type: 'Address',
        args: {
            id: t.arg.int({ required: true }),
            input: t.arg({ type: UpdateAddressInput, required: true }),
        },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            const { address1, address2, city, state, zipCode, country } = args.input;
            return prisma.address.update({
                ...query,
                where: { id: args.id },
                data: {
                    ...(address1 !== undefined && address1 !== null ? { address1 } : {}),
                    ...(address2 !== undefined && address2 !== null ? { address2 } : {}),
                    ...(city !== undefined && city !== null ? { city } : {}),
                    ...(state !== undefined && state !== null ? { state } : {}),
                    ...(zipCode !== undefined && zipCode !== null ? { zipCode } : {}),
                    ...(country !== undefined && country !== null ? { country } : {}),
                },
            });
        },
    })
);

builder.mutationField('deleteAddress', (t) =>
    t.prismaField({
        type: 'Address',
        args: { id: t.arg.int({ required: true }) },
        resolve: (query, _root, args, ctx) => {
            if (!ctx.user) throw new GraphQLError('Not authenticated', { extensions: { code: 'UNAUTHENTICATED' } });
            return prisma.address.delete({ ...query, where: { id: args.id } });
        },
    })
);