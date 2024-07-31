import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { EAdminNavigation } from "../constants/navigation.constant";

export async function adminAuthLoader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: EAdminNavigation.dashboard,
  });
}
