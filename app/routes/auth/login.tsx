import { useLocation, Form, redirect } from "react-router";
import type { Route } from "./+types/login";
import handleLogin from "~/utils/auth/login";
import { createSession, getToken } from "~/utils/auth/session";
import { Link } from "react-router";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Login" },
    { name: "description", content: "User login page" },
  ];
};

export const action = async ({ request }: Route.ActionArgs) => {
  let response: Response;

  const formData = await request.formData();
  const email = formData.get("email") as string | "";
  const password = formData.get("password") as string | "";
  const redirectUrl = formData.get("redirectTo") as string | "/dashboard";

  // Sign in and redirect to the proper destination if successful.
  try {
    const token = await handleLogin({ email, password });
    if (!token) {
      throw new Error("Invalid login attempt");
    }
    response = await createSession({ request, token, redirectUrl });

    if (!response) {
      throw new Error("Failed to create session");
    }
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  throw response;
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const token = await getToken(request);
  if (token) {
    return redirect("/dashboard");
  }
  return null;
};

const LoginPage = ({ actionData }: Route.ComponentProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  return (
    <>
      <Link to="/register">Register</Link>
      <Link to="/forgot-password">Forgot Password</Link>
      <Form method="post">
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Email: <input name="email" />
        </label>
        <label>
          Password: <input name="password" type="password" />
        </label>
        <button type="submit">Login</button>
        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </>
  );
};

export default LoginPage;
