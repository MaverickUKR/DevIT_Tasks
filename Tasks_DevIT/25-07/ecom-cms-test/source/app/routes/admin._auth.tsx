import { Page, Layout } from "@shopify/polaris";
import { Outlet } from "@remix-run/react";

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
