import { Form } from "react-router";

const LogoutButton = () => {
  return (
    <Form method="post" action="/logout">
      <button type="submit">Logout</button>
    </Form>
  );
};

export default LogoutButton;
