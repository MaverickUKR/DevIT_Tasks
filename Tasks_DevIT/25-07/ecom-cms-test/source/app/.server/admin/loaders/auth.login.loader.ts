import { LoaderFunctionArgs, json } from "@remix-run/node";
import { authenticator } from "../services/auth.service";
import { getSession, commitSession } from "../utils/session.util";
import { EAdminNavigation } from "../constants/navigation.constant";

export async function adminAuthLoader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: EAdminNavigation.dashboard,
  });

  const session = await getSession(request.headers.get("cookie"));
  const error = session.get(authenticator.sessionErrorKey);
  return json<{ error?: { message: string } }>(
    { error },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
}
