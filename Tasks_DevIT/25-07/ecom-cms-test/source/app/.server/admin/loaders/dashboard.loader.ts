import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constants/navigation.constant";

export async function adminDashboardLoader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.dashboard,
  });

  return json({ user });
}
