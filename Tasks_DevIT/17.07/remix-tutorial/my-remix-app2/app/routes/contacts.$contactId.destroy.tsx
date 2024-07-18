// import type { ActionFunctionArgs } from "@remix-run/node";
// import { redirect } from "@remix-run/node";
// import invariant from "tiny-invariant";

// import { deleteContact } from "../data";

// export const action = async ({ params }: ActionFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   await deleteContact(params.contactId);
//   return redirect("/");
// };
import { ActionFunction, redirect } from "@remix-run/node";
import { deleteContact } from "../data";

export const action: ActionFunction = async ({ params }) => {
  await deleteContact(params.contactId!);
  return redirect("/");
};

export default function DeleteContact() {
  return (
    <div>
      <h1>Are you sure you want to delete this contact?</h1>
      <form method="post">
        <button type="submit">Yes, delete</button>
      </form>
    </div>
  );
}
