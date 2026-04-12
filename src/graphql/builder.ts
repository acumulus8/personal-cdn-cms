import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '../prisma/pothos-types';
import { getDatamodel } from '../prisma/pothos-types';
import type { AuthJwtPayload } from '@/types/auth.types';
import { prisma } from '@/prisma';

export const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
    Context: { user?: AuthJwtPayload };
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client: prisma,
        dmmf: getDatamodel(),
    },
});

builder.queryType({});
builder.mutationType({});
