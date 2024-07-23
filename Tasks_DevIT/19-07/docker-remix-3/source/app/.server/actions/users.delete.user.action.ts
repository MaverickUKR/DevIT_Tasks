// import { deleteUser } from "../data/dummyjson/users";
// import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";

// export const usersDeleteUserAction: ActionFunction = async ({
//   params,
// }: ActionFunctionArgs) => {
//   if (!params.userId) {
//     throw new Response("Id Not Found", { status: 404 });
//   }
//   await deleteUser(params.userId);
//   return redirect("/");
// };
// import { deleteUser } from "../data/dummyjson/users";
import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";
import { prisma } from "../data/dummyjson/db";

export const usersDeleteUserAction: ActionFunction = async ({
  params,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  await prisma.user.delete({
    where: {
      id: parseInt(params.userId),
    },
  });
  return redirect("/");
};
