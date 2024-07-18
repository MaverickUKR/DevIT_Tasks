// import { LoaderFunction, json } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import { User } from "../data";

// export const loader: LoaderFunction = async ({ params, context }) => {
//   const { users } = context;
//   const user = users.find((user: User) => user.id === parseInt(params.contactId));
//   return json(user);
// };

// export default function EditContact() {
//   const user = useLoaderData<User>();

//   return (
//     <div>
//       <h1>Edit {user.firstName} {user.lastName}</h1>
//       <form method="post">
//         <label>
//           First Name:
//           <input type="text" name="firstName" defaultValue={user.firstName} />
//         </label>
//         <label>
//           Last Name:
//           <input type="text" name="lastName" defaultValue={user.lastName} />
//         </label>
//         <label>
//           Age:
//           <input type="text" name="age" defaultValue={user.age} />
//         </label>
//         <label>
//           Email:
//           <input type="text" name="email" defaultValue={user.email} />
//         </label>
//         <button type="submit">Save</button>
//       </form>
//     </div>
//   );
// }
import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { User } from "../data";

export const loader: LoaderFunction = async ({ params, context }) => {
  const { users } = context as { users: User[] };
  const user = users.find(
    (user: User) => user.id === parseInt(params.contactId!, 10)
  );
  return json(user || null);
};

export default function EditContact() {
  const user = useLoaderData<User | null>();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>
        Edit {user.firstName} {user.lastName}
      </h1>
      <form method="post">
        <label>
          First Name:
          <input type="text" name="firstName" defaultValue={user.firstName} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" defaultValue={user.lastName} />
        </label>
        <label>
          Age:
          <input type="text" name="age" defaultValue={user.age} />
        </label>
        <label>
          Email:
          <input type="text" name="email" defaultValue={user.email} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
