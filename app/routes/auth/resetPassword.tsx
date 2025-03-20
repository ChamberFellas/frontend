import { Form, redirect } from "react-router";
import type { Route } from "./+types/resetPassword";
import { passwordCheck } from "~/utils/auth/password";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { token } = params;

  return token;
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const token = formData.get("token");
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword");

  if (!token) {
    return { error: "Token is missing" };
  }

  if (!password) {
    return { error: "Password is missing" };
  }

  if (!confirmPassword) {
    return { error: "Confirm password is missing" };
  }

  const validity = passwordCheck(password);

  if (!validity.isValid) {
    return { error: validity.error };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  // TODO: Implement password reset logic

  // throw new Response("Password reset successful", { status: 200 });
  throw redirect("/login");
};

const ResetPasswordPage = ({
  loaderData,
  actionData,
}: Route.ComponentProps) => {
  return (
    <Form method="post">
      <input type="hidden" name="token" value={loaderData} />
      <input type="password" name="password" placeholder="New Password" />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
      />
      <button type="submit">Reset Password</button>
      {actionData ? <p className="error">{actionData.error}</p> : null}
    </Form>
  );
};

export default ResetPasswordPage;
