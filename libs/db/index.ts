import { PrismaClient } from "@/libs/db/prisma/client";

const moduleCache = {
    ORMClient: null as PrismaClient | null,
};

function connect(): PrismaClient {
    if (moduleCache.ORMClient) return moduleCache.ORMClient;

    moduleCache.ORMClient = new PrismaClient();
    moduleCache.ORMClient.$connect();

    return moduleCache.ORMClient;
}

const db = {
    connect,
};

export default db;
