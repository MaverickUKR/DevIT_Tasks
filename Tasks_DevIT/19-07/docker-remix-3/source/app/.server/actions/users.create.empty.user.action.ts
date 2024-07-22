// import { redirect } from "@remix-run/react";
// import { createEmptyUser } from "../data/dummyjson/users";

// export const usersCreateEmptyUserAction = async () => {
//   const user = await createEmptyUser();
//   return redirect(`/users/${user.id}/edit`);
// };
import { redirect } from "@remix-run/react";
import { createEmptyUser } from "../data/dummyjson/users";

export const usersCreateEmptyUserAction = async () => {
  const user = await createEmptyUser();
  return redirect(`/users/${user.id}/edit`);
};
