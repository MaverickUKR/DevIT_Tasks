// import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;
// import { PrismaClient } from "@prisma/client";

// let db: PrismaClient;

// declare global {
//   // eslint-disable-next-line no-var
//   var __db: PrismaClient | undefined;
// }

// // this is needed because in development we don't want to restart
// // the server with every change, but we want to make sure we don't
// // create a new connection to the DB with every change either.
// if (process.env.NODE_ENV === "production") {
//   db = new PrismaClient();
// } else {
//   if (!global.__db) {
//     global.__db = new PrismaClient();
//   }
//   db = global.__db;
// }

// export { db };
import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  db = global.__db;
}

export { db };
