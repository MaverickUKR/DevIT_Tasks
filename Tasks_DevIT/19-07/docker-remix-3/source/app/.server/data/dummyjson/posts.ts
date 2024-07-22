import { db } from "./db";
import type { DummyPost } from "./interfaces";
import type { Post } from "@prisma/client";

export function transformPost(post: Post): DummyPost {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
    userId: post.userId,
    tags: (post.tags as string[]) || [],
    reactions: (post.reactions as { likes: number; dislikes: number }) || {
      likes: 0,
      dislikes: 0,
    },
  };
}

export async function getUserPosts(userId: string): Promise<DummyPost[]> {
  const posts = await db.post.findMany({
    where: { userId: parseInt(userId) },
  });

  return posts.map(transformPost);
}
