import { Page, Layout } from "@shopify/polaris";
import { json, Outlet } from "@remix-run/react";

export const loader = () => {
  return json({
    layer: "auth",
  });
};

export default function adminAuth() {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Outlet />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
