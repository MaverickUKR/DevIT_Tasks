// import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
// import { json } from "@remix-run/node";
// import { Form, useLoaderData, useFetcher } from "@remix-run/react";
// import type { FunctionComponent } from "react";
// import invariant from "tiny-invariant";
// import type { ContactRecord } from "../data";
// import { getContact, updateContact } from "../data";

// export const action = async ({ params, request }: ActionFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   const formData = await request.formData();
//   return updateContact(params.contactId, {
//     favorite: formData.get("favorite") === "true",
//   });
// };

// export const loader = async ({ params }: LoaderFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   const contact = await getContact(params.contactId);
//   if (!contact) {
//     throw new Response("Not Found", { status: 404 });
//   }
//   return json({ contact });
// };
// export default function Contact() {
//   const { contact } = useLoaderData<typeof loader>();
//   //   const contact = {
//   //     first: "Your",
//   //     last: "Name",
//   //     avatar: "https://placekitten.com/200/200",
//   //     twitter: "your_handle",
//   //     notes: "Some notes",
//   //     favorite: true,
//   //   };

//   return (
//     <div id="contact">
//       <div>
//         <img
//           alt={`${contact.firstName} ${contact.lastName} avatar`}
//           key={contact.avatar}
//           src={contact.avatar}
//         />
//       </div>

//       <div>
//         <h1>
//           {contact.firstName || contact.lastName ? (
//             <>
//               {contact.firstName} {contact.lastName}
//             </>
//           ) : (
//             <i>No Name</i>
//           )}{" "}
//           <Favorite contact={contact} />
//         </h1>

//         {contact.notes ? <p>{contact.notes}</p> : null}

//         <div>
//           <Form action="edit">
//             <button type="submit">Edit</button>
//           </Form>

//           <Form
//             action="destroy"
//             method="post"
//             onSubmit={(event) => {
//               const response = confirm(
//                 "Please confirm you want to delete this record."
//               );
//               if (!response) {
//                 event.preventDefault();
//               }
//             }}
//           >
//             <button type="submit">Delete</button>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

// const Favorite: FunctionComponent<{
//   contact: Pick<ContactRecord, "favorite">;
// }> = ({ contact }) => {
//   const fetcher = useFetcher();
//   const favorite = fetcher.formData
//     ? fetcher.formData.get("favorite") === "true"
//     : contact.favorite;

//   return (
//     <fetcher.Form method="post">
//       <button
//         aria-label={favorite ? "Remove rom favorites" : "Add to favorites"}
//         name="favorite"
//         value={favorite ? "false" : "true"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// };
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

export default function Contact() {
  const user = useLoaderData<User | null>();

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <h1>
        {user.firstName} {user.lastName}
      </h1>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
