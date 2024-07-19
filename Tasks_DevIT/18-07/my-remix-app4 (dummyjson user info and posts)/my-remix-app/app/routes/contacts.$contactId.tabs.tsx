// import { useLoaderData, NavLink, Outlet } from "react-router-dom";
// import { getContact, getUserPosts } from "../data";

// export async function loader({ params }) {
//   const contact = await getContact(params.contactId);
//   const posts = await getUserPosts(params.contactId);
//   return { contact, posts };
// }

// export default function ContactTabs() {
//   const { contact, posts } = useLoaderData();

//   return (
//     <div>
//       <h1>
//         {contact.first} {contact.last}
//       </h1>
//       <nav>
//         <ul>
//           <li>
//             <NavLink to="info" end>
//               Инфо
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="posts">Посты</NavLink>
//           </li>
//         </ul>
//       </nav>
//       <Outlet context={{ contact, posts }} />
//     </div>
//   );
// }
import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { getContact, getUserPosts } from "~/data";
import type { Contact, Post } from "./types"; // Предположим, что типы определены в отдельном файле

interface LoaderData {
  contact: Contact;
  posts: Post[];
}

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.contactId) {
    throw new Response("Not Found", { status: 404 });
  }
  const contact = await getContact(params.contactId);
  const posts = await getUserPosts(params.contactId);
  return json({ contact, posts });
};

export default function ContactTabs() {
  const { contact, posts } = useLoaderData<LoaderData>();

  return (
    <div>
      <h1>
        {contact.first} {contact.last}
      </h1>
      <nav>
        <ul>
          <li>
            <a href="#info">Инфо</a>
          </li>
          <li>
            <a href="#posts">Посты</a>
          </li>
        </ul>
      </nav>
      <div id="info">
        <h2>Информация о пользователе</h2>
        <p>
          <strong>Имя:</strong> {contact.first}
        </p>
        <p>
          <strong>Фамилия:</strong> {contact.last}
        </p>
        <p>
          <strong>Твиттер:</strong> {contact.twitter}
        </p>
        <p>
          <strong>Заметки:</strong> {contact.notes}
        </p>
      </div>
      <div id="posts">
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
    </div>
  );
}
