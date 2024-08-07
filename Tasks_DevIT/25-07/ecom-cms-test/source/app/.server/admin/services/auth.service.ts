import type { User } from "@prisma/client";
import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "../utils/session.util";
import { comparePassword } from "../../shared/utils/auth.util";
import { prisma } from "../../shared/utils/prisma.util";
import { validator } from "../../../routes/admin._auth.auth.login";
import { ValidatorErrorWrapper } from "../../shared/errors/validator-error-wrapper";

export const ADMIN_AUTH_STRATEGY = "admin-pass";

export const authenticator = new Authenticator<User>(sessionStorage);

const findUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    throw new ValidatorErrorWrapper({
      fieldErrors: {
        email: "User not found",
      },
    });
  }
  if (!(await comparePassword(password, user.password))) {
    throw new ValidatorErrorWrapper({
      fieldErrors: {
        password: "Wrong password",
      },
    });
  }

  return user;
};

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const data = await validator.validate(form);

    if (data.error) {
      throw new ValidatorErrorWrapper(data.error);
    }
    const { email, password } = data.data;

    return await findUser(email, password);
  }),
  ADMIN_AUTH_STRATEGY
);
