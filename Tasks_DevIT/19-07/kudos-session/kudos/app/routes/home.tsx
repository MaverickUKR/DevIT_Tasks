// app/routes/home.tsx
import { json, LoaderFunction } from "@remix-run/node";
import { requireUserId } from "../components/utils/auth.server";
import { Layout } from "../components/layout";
import { UserPanel } from "../components/user-panel";
import { getOtherUsers } from "../components/utils/user.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const users = await getOtherUsers(userId);
  return json({ users });
};

export default function Home() {
  const { users } = useLoaderData();
  return (
    <Layout>
      <div className="h-full flex">
        <UserPanel users={users} />
        <div className="flex-1"></div>
      </div>
    </Layout>
  );
}
