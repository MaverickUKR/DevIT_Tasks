import { LoaderFunctionArgs } from "@remix-run/node";
// import { getUserPosts } from "../data/dummyjson";
import { prisma } from "../../.server/data/dummyjson/db";

export const usersPostsLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const posts = await prisma.post.findMany({
    where: {
      userId: parseInt(params.userId),
    },
    include: {
      reactions: true,
    },
  });
  if (!posts) {
    throw new Response("Posts Not Found", { status: 404 });
  }
  return { posts };
};
