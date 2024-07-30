import { EAdminNavigation } from "../constants/navigation.constant";
import { AuthorizationError } from "remix-auth";
import { ADMIN_AUTH_STRATEGY, authenticator } from "../services/auth.service";
import { ActionFunctionArgs, json } from "@remix-run/node";

export async function adminAuthLoginAction({ request }: ActionFunctionArgs) {
  try {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: EAdminNavigation.dashboard,
      // failureRedirect: EAdminNavigation.authLogin,
      throwOnError: true,
    });
  } catch (error) {
    if (error instanceof Response) {
      // если не делать эту проверку, всегда будет throwOnError и никогда не отработает successRedirect
      return error;
    }
    if (error instanceof AuthorizationError) {
      //
      return json({
        error: {
          message: error.message,
        },
      });
    }
    return json({
      error: {
        message: "Unknown error",
      },
    });
  }
}
