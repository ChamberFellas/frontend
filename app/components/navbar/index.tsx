import { Link } from "react-router";
import LogoutButton from "./logoutButton";

const Navbar = () => {
  return (
    <nav>
      <Link to="/dashboard">Home</Link>
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
