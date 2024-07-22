import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateUser } from "../data/dummyjson/users";
import type { DummyUser } from "../data/dummyjson/interfaces";

export const usersEditUserAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData.entries());

  const userUpdates: Partial<DummyUser> = {
    firstName: updates.firstName as string,
    lastName: updates.lastName as string,
    age: parseInt(updates.age as string, 10),
    image: updates.image as string,
    email: updates.email as string,
    favorite: updates.favorite === "true",
    address: {
      country: updates.country as string,
      city: updates.city as string,
      address: updates.address as string,
    },
  };
  await updateUser(params.userId, userUpdates);
  return redirect(`/users/${params.userId}/edit`);
};
