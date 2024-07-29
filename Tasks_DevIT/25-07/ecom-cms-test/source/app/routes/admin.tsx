import { LinksFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import polarisStylesHref from "@shopify/polaris/build/esm/styles.css?url";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: polarisStylesHref },
];

export default function Admin() {
  return (
    <AppProvider i18n={enTranslations}>
      <Outlet />
    </AppProvider>
  );
}
