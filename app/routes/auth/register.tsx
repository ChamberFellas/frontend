import "./../../styles/register-style.scss"; // Import the SCSS file
import { Form, Link } from "react-router";
import type { Route } from "./+types/register";
import { createSession } from "~/utils/auth/session";
import handleRegister from "~/utils/auth/register";
import { useLocation } from "react-router";
import { passwordCheck } from "~/utils/auth/password";

// Placeholder function to simulate saving user info
const saveUserInfo = async (userInfo: {
  email: string;
  name: string;
  password: string;
}): Promise<boolean> => {
  try {
    console.log("Saving user info:", userInfo);
    // Simulate success
    return true;
  } catch (error) {
    console.error("Failed to save user info:", error);
    return false;
  }
};

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
    // Validate password
    const validity = passwordCheck(password);
    if (!validity.isValid) {
      return {
        error: validity.error,
      };
    }

    // Save user info
    const saveSuccess = await saveUserInfo({ email, name, password });
    if (!saveSuccess) {
      return {
        error: "Failed to save user info",
      };
    }

    // Handle registration
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

    // Create session
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
    <div className="register-container">
      <h1>Register Account</h1>
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
    </div>
  );
};

export default RegisterPage;