'use strict';

// import { Sequelize } from 'sequelize';
// import { TextEncoder } from 'util';

// Needed for testing purposes, do not remove
// global.TextEncoder = TextEncoder;

// const {
//   POSTGRES_HOST,
//   POSTGRES_PORT,
//   POSTGRES_USER,
//   POSTGRES_PASSWORD,
//   POSTGRES_DB,
// } = process.env;

/*
  All credentials setted to default values (exsept password - it is exapmle)
  replace if needed with your own
*/

// export const sequelize = new Sequelize({
//   database: POSTGRES_DB || 'postgres',
//   username: POSTGRES_USER || 'postgres',
//   host: POSTGRES_HOST || 'localhost',
//   dialect: 'postgres',
//   port: POSTGRES_PORT || 5432,
//   password: POSTGRES_PASSWORD || '1111',
// });

// module.exports = {
//   sequelize,
// };
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
