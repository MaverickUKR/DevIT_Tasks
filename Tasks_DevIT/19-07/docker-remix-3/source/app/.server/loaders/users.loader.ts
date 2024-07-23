// import { LoaderFunctionArgs } from "@remix-run/node";
// // import { searchUsers, getUsers } from "../data/dummyjson/users";
// import { prisma } from "../../.server/data/dummyjson/db";

// export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q")?.trim() || "";
//   const users = await prisma.user.findMany();
//   return { users, q };
// };
// source/loaders/users.loader.ts
import { LoaderFunctionArgs } from "@remix-run/node";
import { prisma } from "../../.server/data/dummyjson/db";

export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";

  let users;

  if (q) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: q, mode: "insensitive" } },
          { lastName: { contains: q, mode: "insensitive" } },
        ],
      },
    });
  } else {
    users = await prisma.user.findMany();
  }

  return { users, q };
};
