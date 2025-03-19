import { type MetaFunction, redirect } from "react-router";
import type { Route } from "./+types/forgotPassword.ts";
import { getToken } from "~/utils/auth/session";

/**
 * Defines metadata for the logout route.
 *
 * @returns An array of metadata objects for the route.
 * @see https://reactrouter.com/en/dev/route/meta
 */
export const meta: MetaFunction = () => {
  return [
    { title: "Reset Password" },
    { name: "description", content: "Reset your password." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await getToken(request);
  if (token) {
    return redirect("/dashboard");
  }
  return null;
};

export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!email) {
    return { error: "Email is missing" };
  }

  // TODO: Implement password reset logic
  // Change what the users see after resetting their password
  return { message: "Password reset email sent" };
};

const ForgotPassword = ({ actionData }: Route.ComponentProps) => {
  return (
    <div>
      <h1>Reset Password</h1>
      {!actionData && (
        <>
          <p>Enter your email address to reset your password.</p>
          <form method="post">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
            <button type="submit">Reset Password</button>
          </form>
        </>
      )}
      {actionData && actionData.message && <p>{actionData.message}</p>}
      {actionData && actionData.error && <p>{actionData.error}</p>}
    </div>
  );
};

export default ForgotPassword;
