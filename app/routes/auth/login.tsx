import { useLocation, Form } from "react-router"; // Importing hooks and components from react-router
import type { Route } from "./+types/login"; // Importing TypeScript types for route props
import handleLogin from "~/utils/auth/login"; // Function to handle login logic
import { createSession } from "~/utils/auth/session"; // Function to create a user session
import { Link } from "react-router"; // Importing Link for navigation
import "../../styles/login-style.scss"; // Importing the SCSS file for styling

// Metadata for the page (used for SEO and browser tab titles)
export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Login" }, // Title of the page
    { name: "description", content: "User login page" }, // Description of the page
  ];
};

// Action function to handle form submission
export const action = async ({ request }: Route.ActionArgs) => {
  let response: Response; // Variable to store the response


    //FINN HERE !!!!!!!!!!!!!!!!

  // Extracting form data from the request
  const formData = await request.formData();
  const email = formData.get("email") as string | ""; // Get the email field
  const password = formData.get("password") as string | ""; // Get the password field
  const redirectUrl = "/dashboard"; // URL to redirect to after successful login

  try {
    // Attempt to log in the user
    const token = await handleLogin({ email, password }); // Call the login function
    if (!token) {
      throw new Error("Invalid login attempt"); // Throw an error if login fails
    }

    // Create a session for the user
    response = await createSession({ request, token, redirectUrl });
    if (!response) {
      throw new Error("Failed to create session"); // Throw an error if session creation fails
    }
  } catch (error) {
    // Return an error message if login or session creation fails
    return {
      error: "Invalid login attempt",
    };
  }

  // Redirect the user to the dashboard after successful login
  throw response;
};

// The main LoginPage component
const LoginPage = ({ actionData }: Route.ComponentProps) => {
  const location = useLocation(); // Hook to access the current location
  const params = new URLSearchParams(location.search); // Parse query parameters from the URL
  const from = params.get("from") || "/"; // Get the "from" parameter or default to "/"
  console.log(from); // Log the "from" parameter for debugging

  return (
    <div className="login-container">
      {/* Page heading */}
      <h1 className="login-heading">Login</h1>

      {/* Form for user login */}
      <Form method="post" className="login-form">
        {/* Hidden input to store the redirect URL */}
        <input type="hidden" name="redirectTo" value={from} />

        {/* Input field for email */}
        <div className="login-input-container">
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" className="login-input" />
        </div>

        {/* Input field for password */}
        <div className="login-input-container">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="login-input"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="login-button">
          Login
        </button>

        {/* Links for registration and password recovery */}
        <div className="login-links">
          <Link to="/register" className="login-link">
            Register
          </Link>
          <Link to="/forgot-password" className="login-link">
            Forgot Password
          </Link>
        </div>

        {/* Display error message if login fails */}
        {actionData && actionData.error && (
          <p className="error">{actionData.error}</p>
        )}
      </Form>
    </div>
  );
};

export default LoginPage; // Exporting the LoginPage component so it can be used in other parts of the app