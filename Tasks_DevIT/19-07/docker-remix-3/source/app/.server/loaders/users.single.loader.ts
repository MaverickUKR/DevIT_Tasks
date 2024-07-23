import { LoaderFunctionArgs } from "@remix-run/node";
// import { getUserById } from "../data/dummyjson";
import { prisma } from "../../.server/data/dummyjson/db";

export const usersSingleLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.userId) },
    include: { address: true },
  });
  if (!user) {
    throw new Response("User Not Found", { status: 404 });
  }
  return { user };
};
