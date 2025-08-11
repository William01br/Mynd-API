import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['warn', 'error'],
});

export async function connectToPrisma(): Promise<void> {
  await prisma.$connect();

  await prisma.$queryRaw`SELECT 1 as result`;
}
