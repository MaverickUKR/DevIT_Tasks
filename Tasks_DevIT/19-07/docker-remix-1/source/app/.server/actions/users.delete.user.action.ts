import { deleteUser } from "../data/dummyjson/users";
import { ActionFunction, ActionFunctionArgs, redirect } from "@remix-run/node";

export const usersDeleteUserAction: ActionFunction = async ({
  params,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  await deleteUser(params.userId);
  return redirect("/");
};
