// import { redirect } from "@remix-run/react";
// import { createEmptyUser } from "../data/dummyjson/users";

// export const usersCreateEmptyUserAction = async () => {
//   const user = await createEmptyUser();
//   return redirect(`/users/${user.id}/edit`);
// };
import { redirect } from "@remix-run/react";
// import { createEmptyUser } from "../data/dummyjson/users";
import { prisma } from "../../.server/data/dummyjson/db";

export const usersCreateEmptyUserAction = async () => {
  const user = await prisma.user.create({
    data: {
      firstName: "",
      lastName: "",
      age: 0,
      image: "",
      favorite: false,
      email: "",
      password: "",
      address: {
        create: {
          country: "",
          city: "",
          address: "",
        },
      },
    },
  });
  return redirect(`/users/${user.id}/edit`);
};
