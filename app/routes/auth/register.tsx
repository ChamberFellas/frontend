import "./../../styles/register-style.scss"; // Importing the SCSS file for styling
import { Form, Link } from "react-router"; // Importing Form and Link components from react-router
import type { Route } from "./+types/register"; // Importing the Route type for TypeScript type checking
import { createSession } from "~/utils/auth/session"; // Importing a utility function to create a session
import { useLocation } from "react-router"; // Importing useLocation to access the current URL
import { passwordCheck } from "~/utils/auth/password"; // Importing a utility function to validate passwords
import { registerUser } from "./connect_to_usersV2"; // Importing the registerUser function

// Metadata for the page (used for SEO and browser tab titles)
export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Register Account" }, // Title of the page
    { name: "description", content: "User registration page" }, // Description of the page
  ];
};

// Action function to handle form submission
export const action = async ({ request }: Route.ActionArgs) => {
  const formData = await request.formData();
  const email = String(formData.get("email")) || ""; // Get the email field
  const name = String(formData.get("name")) || ""; // Get the name field
  const password = String(formData.get("password")) || ""; // Get the password field
  const repeatPassword = String(formData.get("repeatPassword")) || ""; // Get the repeat password field
  const redirectUrl = String(formData.get("redirectTo")) || "/dashboard"; // Get the redirect URL or default to "/dashboard"

  try {
    // Validate the password using the passwordCheck utility
    // const validity =   (password);
    // if (!validity.isValid) {
    //   return {
    //     error: validity.error, // Return an error if the password is invalid
    //   };
    // }

    // Ensure passwords match
    if (password !== repeatPassword) {
      return {
        error: "Passwords do not match.",
      };
    }

    // Call the registerUser function
    const result = await registerUser(email, password, name);

    if (!result) {
      return {
        error: "Failed to register user. Please try again later.",
      };
    }

    // Simulate creating a session for the user
    const token = "mockToken"; // Replace with actual token if returned by the API
    const response = await createSession({ request, token, redirectUrl });

    if (!response) {
      return {
        error: "Failed to create session. Please try again later.",
      };
    }

    // Redirect the user to the dashboard
    throw response;
  } catch (error: any) {
    // Handle unexpected errors
    console.error("Unexpected error during registration:", error);
    return {
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};

// The main RegisterPage component
const RegisterPage = ({ actionData }: Route.ComponentProps) => {
  const location = useLocation(); // Get the current location (URL)
  const params = new URLSearchParams(location.search); // Parse the query parameters
  const redirectTo = params.get("redirectTo") || "/dashboard"; // Get the redirect URL or default to "/dashboard"

  return (
    <div className="register-container">
      <h1>Register Account</h1>
      {/* Link to navigate to the login page */}
      <Link to="/login">Already have an account?</Link>
      {/* Form for user registration */}
      <Form method="post">
        {/* Hidden input to pass the redirect URL */}
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label>
          Email:
          <input type="email" name="email" required /> {/* Email input field */}
        </label>
        <label>
          Name:
          <input type="text" name="name" required /> {/* Name input field */}
        </label>
        <label>
          Password:
          <input type="password" name="password" required /> {/* Password input field */}
        </label>
        <label>
          Repeat Password:
          <input type="password" name="repeatPassword" required /> {/* Repeat password input field */}
        </label>
        <button type="submit">Register</button> {/* Submit button */}
        {/* Display an error message if there is one */}
        {actionData && actionData.error && (
          <div className="error">{actionData.error}</div>
        )}
      </Form>
    </div>
  );
};

export default RegisterPage; // Exporting the RegisterPage component so it can be used in the app