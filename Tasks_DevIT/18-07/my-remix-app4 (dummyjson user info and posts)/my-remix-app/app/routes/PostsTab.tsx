import { useOutletContext } from "@remix-run/react";
import type { Post } from "./types";

interface PostsContext {
  posts: Post[];
}

export default function PostsTab() {
  const { posts } = useOutletContext<PostsContext>();

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
