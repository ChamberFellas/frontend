import "./../../styles/register-style.scss"; // Importing the SCSS file for styling
import { Form, Link } from "react-router"; // Importing Form and Link components from react-router
import type { Route } from "./+types/register"; // Importing the Route type for TypeScript type checking
import { createSession } from "~/utils/auth/session"; // Importing a utility function to create a session
import handleRegister from "~/utils/auth/register"; // Importing a utility function to handle user registration
import { useLocation } from "react-router"; // Importing useLocation to access the current URL
import { passwordCheck } from "~/utils/auth/password"; // Importing a utility function to validate passwords

// Placeholder function to simulate saving user info
const saveUserInfo = async (userInfo: {
  email: string;
  name: string;
  password: string;
}): Promise<boolean> => {
  try {
    console.log("Saving user info:", userInfo); // Log the user info for debugging
    // Simulate success
    return true;
  } catch (error) {
    console.error("Failed to save user info:", error); // Log any errors
    return false;
  }
};

// Metadata for the page (used for SEO and browser tab titles)
export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Register Account" }, // Title of the page
    { name: "description", content: "User registration page" }, // Description of the page
  ];
};

// Action function to handle form submission
export const action = async ({ request }: Route.ActionArgs) => {
  let response: Response;



  //FINN HERE !!!!!!!!!!!!!!!!
  // Extract form data from the request
  const formData = await request.formData();
  const email = String(formData.get("email")) || ""; // Get the email field
  const name = String(formData.get("name")) || ""; // Get the name field
  const password = String(formData.get("password")) || ""; // Get the password field
  const repeatPassword = String(formData.get("repeatPassword")) || ""; // Get the repeat password field
  const redirectUrl = String(formData.get("redirectTo")) || "/dashboard"; // Get the redirect URL or default to "/dashboard"

  try {
    // Validate the password using the passwordCheck utility
    const validity = passwordCheck(password);
    if (!validity.isValid) {
      return {
        error: validity.error, // Return an error if the password is invalid
      };
    }

    // Save the user info (simulated with the saveUserInfo function)
    const saveSuccess = await saveUserInfo({ email, name, password });
    if (!saveSuccess) {
      return {
        error: "Failed to save user info", // Return an error if saving fails
      };
    }

    // Handle user registration
    const token = await handleRegister({
      email,
      name,
      password,
      repeatPassword,
    });

    if (!token) {
      return {
        error: "Failed to create user", // Return an error if registration fails
      };
    }

    // Create a session for the user
    response = await createSession({ request, token, redirectUrl });

    if (!response) {
      return {
        error: "Failed to create session", // Return an error if session creation fails
      };
    }
  } catch (error) {
    return {
      error: "Failed to create user", // Return a generic error if something goes wrong
    };
  }

  throw response; // Throw the response to redirect the user
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