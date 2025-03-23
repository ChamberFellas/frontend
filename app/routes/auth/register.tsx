import { Form, Link } from "react-router";
import type { Route } from "./+types/register";
import { createSession } from "~/utils/auth/session";
import handleRegister from "~/utils/auth/register";
import { useLocation } from "react-router";
import { passwordCheck } from "~/utils/auth/password";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Register Account" },
    { name: "description", content: "User registration page" },
  ];
};

export const action = async ({ request }: Route.ActionArgs) => {
  let response: Response;

  const formData = await request.formData();
  const email = String(formData.get("email")) || "";
  const name = String(formData.get("name")) || "";
  const password = String(formData.get("password")) || "";
  const repeatPassword = String(formData.get("repeatPassword")) || "";
  const redirectUrl = String(formData.get("redirectTo")) || "/dashboard";

  try {
    const validity = passwordCheck(password);
    if (!validity.isValid) {
      return {
        error: validity.error,
      };
    }

    const token = await handleRegister({
      email,
      name,
      password,
      repeatPassword,
    });

    if (!token) {
      return {
        error: "Failed to create user",
      };
    }

    response = await createSession({ request, token, redirectUrl });

    if (!response) {
      return {
        error: "Failed to create session",
      };
    }
  } catch (error) {
    return {
      error: "Failed to create user",
    };
  }

  throw response;
};

const RegisterPage = ({ actionData }: Route.ComponentProps) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirectTo") || "/dashboard";

  return (
    <>
      <Link to="/login">Already have an account?</Link>
      <Form method="post">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <label>
          Repeat Password:
          <input type="password" name="repeatPassword" required />
        </label>
        <button type="submit">Register</button>
        {actionData && actionData.error && (
          <div className="error">{actionData.error}</div>
        )}
      </Form>
    </>
  );
};

export default RegisterPage;
