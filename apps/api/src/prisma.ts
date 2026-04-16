import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb} from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME || "tw_cms_dev",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "manitou423",
    allowPublicKeyRetrieval: true,
})

const prismaSingleton = () => new PrismaClient({
    adapter,
    log: ["query", "info", "warn", "error"]
});

const globalForPrisma = global as unknown as { prisma: ReturnType<typeof prismaSingleton> };

export const prisma = globalForPrisma.prisma ?? prismaSingleton();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;