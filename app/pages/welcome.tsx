import { Link } from "react-router";
import LogoutButton from "~/components/navbar/logoutButton";

interface WelcomeProps {
  isLoggedIn: boolean;
}

const Welcome = ({ isLoggedIn }: WelcomeProps) => {
  return (
    <main>
      <h1>Welcome</h1>
      {isLoggedIn ? (
        <LogoutButton />
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </main>
  );
};

export default Welcome;
