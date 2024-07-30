import { useActionData } from "@remix-run/react";
import { adminAuthLoader } from "../.server/admin/loaders/auth.login.loader";
import { adminAuthLoginAction } from "../.server/admin/actions/auth.login.action";
import { Card, FormLayout, Text, Box, Banner } from "@shopify/polaris";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { ValidatedForm } from "remix-validated-form";
import { ValidatedTextField } from "../admin/ui/ValidatedTextField/ValidatedTextField";
import { ValidatedSubmitButton } from "../admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";

export const action = adminAuthLoginAction;

export const loader = adminAuthLoader;

export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(1, { message: "password must not be empty" }),
  })
);
export default function Index() {
  const actionData = useActionData<typeof action>();

  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Admin CMS
      </Text>

      {actionData?.error && (
        <Box paddingBlockStart="200">
          <Banner tone="warning">
            <p>{actionData.error?.message}</p>
          </Banner>
        </Box>
      )}
      <Box paddingBlockStart="200">
        <ValidatedForm validator={validator} method="post">
          <FormLayout>
            <ValidatedTextField
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
            />
            <ValidatedTextField
              label="Password"
              type="password"
              name="password"
              autoComplete="on"
            />
            <ValidatedSubmitButton text="Submit" />
          </FormLayout>
        </ValidatedForm>
      </Box>
    </Card>
  );
}
