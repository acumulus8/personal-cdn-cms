import { PrismaClient } from "@prisma/client/extension";

const prismaSingleton = () => new PrismaClient({
    log: ["query", "info", "warn", "error"],
});

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof prismaSingleton> };

export const prisma = globalForPrisma.prisma ?? prismaSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;