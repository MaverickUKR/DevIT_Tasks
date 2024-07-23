import { ActionFunctionArgs, redirect } from "@remix-run/node";
// import { updateUser } from "../data/dummyjson/users";
import { prisma } from "../data/dummyjson/db";
import type { TDummyUser } from "../data/dummyjson/interfaces";

export const usersEditUserAction = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  if (!params.userId) {
    throw new Response("Id Not Found", { status: 404 });
  }
  const formData = await request.formData();
  const updates = Object.fromEntries(formData.entries()) as Partial<TDummyUser>;
  // const updates = Object.fromEntries(formData) as {
  //   [key: string]: TDummyUserPartial;
  // };

  await prisma.user.update({
    where: {
      id: parseInt(params.userId),
    },
    data: updates,
  });
  return redirect(`/users/${params.userId}/edit`);
};
