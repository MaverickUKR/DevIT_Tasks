import type { PrismaClient } from "@prisma/client";
import { $Enums } from "@prisma/client";
import { environment } from "../../app/.server/constants/environment.constants";
import { hashPassword } from "../../app/.server/utils/auth.util";

export const createDefaultAdmin = async (prisma: PrismaClient) => {
  console.log("Seeding default admin");
  const user = await prisma.user.findFirst({
    where: { email: environment.users.admin.email },
  });

  if (user) {
    console.log("Default admin already exists");
    return;
  }

  console.log("Creating default admin");
  await prisma.user.create({
    data: {
      fullName: "Default Admin",
      email: environment.users.admin.email as string,
      password: await hashPassword(environment.users.admin.password as string),
      role: $Enums.AdminRole.ADMIN,
    },
  });
};
