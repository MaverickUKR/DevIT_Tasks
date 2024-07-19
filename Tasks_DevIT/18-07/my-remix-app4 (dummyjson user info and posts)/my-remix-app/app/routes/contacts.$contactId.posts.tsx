import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUserPosts } from "~/data";
import type { LoaderFunction } from "@remix-run/node";
import type { Post } from "./types";

export const loader: LoaderFunction = async ({ params }) => {
  const posts = await getUserPosts(params.contactId as string);
  return json({ posts });
};

export default function PostsTab() {
  const { posts } = useLoaderData<{ posts: Post[] }>();

  if (!posts) {
    return <div>No posts found</div>;
  }

  return (
    <div>
      <h2>Посты пользователя</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
