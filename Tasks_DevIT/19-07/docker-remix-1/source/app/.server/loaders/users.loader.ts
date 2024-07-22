import { LoaderFunctionArgs } from "@remix-run/node";
import { searchUsers, getUsers } from "../data/dummyjson/users";

export const usersLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q")?.trim() || "";
  if (q) {
    const users = await searchUsers(q);
    return { users: users || [], q };
  }
  const users = await getUsers();
  return { users: users || [], q };
};
