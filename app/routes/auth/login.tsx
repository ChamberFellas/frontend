import { useLocation, Form } from "react-router";
import type { Route } from "./+types/login";
import handleLogin from "~/utils/auth/login";
import { createSession } from "~/utils/auth/session";
import { Link } from "react-router";
import "../../styles/login-style.scss"; // Correctly reference the SCSS file

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

const LoginPage = ({ actionData }: Route.ComponentProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";
  console.log(from);

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <Form method="post" className="login-form">
        <input type="hidden" name="redirectTo" value={from} />
        <div className="login-input-container">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" className="login-input" />
        </div>
        <div className="login-input-container">
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" className="login-input" />
        </div>
        <button type="submit" className="login-button">Login</button>
        <div className="login-links">
        <Link to="/register" className="login-link">Register</Link>
        <Link to="/forgot-password" className="login-link">Forgot Password</Link>
      </div>
        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
};


export default LoginPage;