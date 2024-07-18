// import { useEffect } from "react";
// import { json, redirect } from "@remix-run/node";
// import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
// import {
//   Form,
//   Link,
//   Links,
//   Meta,
//   NavLink,
//   Outlet,
//   Scripts,
//   ScrollRestoration,
//   useLoaderData,
//   useNavigation,
//   useSubmit,
// } from "@remix-run/react";
// import appStylesHref from "./app.css?url";
// import { getContacts, createEmptyContact } from "./data";
// // import { ContactRecord } from "./data";
// // import Contact from "./routes/contacts.$contactId";

// // export const loader: LoaderFunction = async () => {
// //   const users = await fetchUsers();
// //   return json(users);
// // };

// // export default function Index() {
// //   const users = useLoaderData<User[]>();
// export const action = async () => {
//   const contact = await createEmptyContact();
//   return redirect(`/contacts/${contact.id}/edit`);
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const url = new URL(request.url);
//   const q = url.searchParams.get("q");
//   const contacts = await getContacts(q);
//   return json({ contacts, q });
// };

// export const links: LinksFunction = () => [
//   { rel: "stylesheet", href: appStylesHref },
// ];

// export default function App() {
//   const navigation = useNavigation();
//   const submit = useSubmit();
//   const searching =
//     navigation.location &&
//     new URLSearchParams(navigation.location.search).has("q");
//   // const { contacts } = useLoaderData<{ contacts: ContactRecord[] }>();
//   const { contacts, q } = useLoaderData<typeof loader>();
//   useEffect(() => {
//     const searchField = document.getElementById("q");
//     if (searchField instanceof HTMLInputElement) {
//       searchField.value = q || "";
//     }
//   }, [q]);
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <Meta />
//         <Links />
//       </head>
//       <body>
//         <div id="sidebar">
//           <h1>Remix Contacts</h1>
//           <div>
//             <Form
//               id="search-form"
//               role="search"
//               onChange={(event) => {
//                 const isFirstSearch = q === null;
//                 submit(event.currentTarget, {
//                   replace: !isFirstSearch,
//                 });
//               }}
//             >
//               <input
//                 aria-label="Search contacts"
//                 className={searching ? "loading" : ""}
//                 defaultValue={q || ""}
//                 id="q"
//                 name="q"
//                 placeholder="Search"
//                 type="search"
//               />
//               <div id="search-spinner" aria-hidden hidden={!searching} />
//             </Form>
//             <Form method="post">
//               <button type="submit">New</button>
//             </Form>
//           </div>
//           <nav>
//             {contacts.length ? (
//               <ul>
//                 {contacts.map((contact) => (
//                   <li key={contact.id}>
//                     <NavLink
//                       className={({ isActive, isPending }) =>
//                         isActive ? "active" : isPending ? "pending" : ""
//                       }
//                       to={`contacts/${contact.id}`}
//                     >
//                       <Link to={`contacts/${contact.id}`}>
//                         {contact.firstName || contact.lastName ? (
//                           <>
//                             {contact.firstName} {contact.lastName}
//                           </>
//                         ) : (
//                           <i>No Name</i>
//                         )}{" "}
//                         {contact.favorite ? <span>★</span> : null}
//                       </Link>
//                     </NavLink>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>
//                 <i>No contacts</i>
//               </p>
//             )}
//           </nav>
//         </div>
//         <div
//           id="detail"
//           className={navigation.state === "loading" ? "loading" : ""}
//         >
//           <Outlet />
//         </div>

//         <ScrollRestoration />
//         <Scripts />
//       </body>
//     </html>
//   );
// }
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LoaderFunction, json } from "@remix-run/node";
import { User } from "./data";

export const loader: LoaderFunction = async ({ context }) => {
  const { users } = context as { users: User[] };
  return json(users);
};

export default function App() {
  const users = useLoaderData<User[]>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ display: "flex" }}>
          <aside
            style={{ width: "250px", padding: "1rem", background: "#f0f0f0" }}
          >
            <h2>Users</h2>
            <ul>
              {users.length > 0 ? (
                users.map((user: User) => (
                  <li key={user.id}>
                    {user.firstName} {user.lastName}
                  </li>
                ))
              ) : (
                <li>No users found</li>
              )}
            </ul>
          </aside>
          <main style={{ flex: 1, padding: "1rem" }}>
            <Outlet />
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
