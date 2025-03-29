import { Form } from "react-router";
import "../../styles/logoutButtonStyle.scss"; // Import the CSS/SCSS file

const LogoutButton = () => {
  return (
    <Form method="post" action="/logout">
      <button type="submit" className="logout-button">
        Logout
      </button>
    </Form>
  );
};

export default LogoutButton;