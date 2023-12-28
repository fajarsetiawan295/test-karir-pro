import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PrismaService {
  constructor() {}

  getPrisma() {
    return prisma;
  }
}

export default PrismaService;
