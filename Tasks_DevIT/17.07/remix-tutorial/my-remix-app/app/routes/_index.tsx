// export default function Index() {
//   return (
//     <p id="index-page">
//       This is a demo for Remix.
//       <br />
//       Check out <a href="https://remix.run">the docs at remix.run</a>.
//     </p>
//   );
// }
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchUsers, User } from "../data";

export const loader: LoaderFunction = async () => {
  const users = await fetchUsers();
  return json(users);
};

export default function Index() {
  const users = useLoaderData<User[]>();
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user: User) => (
          <li key={user.id}>
            {user.firstName} {user.lastName} ({user.age})
          </li>
        ))}
      </ul>
      <p id="index-page">
        <a href="https://remix.run">the docs at remix.run</a>
      </p>
    </div>
  );
}
