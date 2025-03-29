import Navbar from "~/components/navbar";
import type { Route } from "./+types/account";
import LogoutButton from "~/components/navbar/logoutButton";
import { Link } from "react-router"; // Import Link for navigation
import "../../styles/settingsPage.scss"; // Import the CSS/SCSS file

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Account" },
    { name: "description", content: "Manage your account" },
  ];
};

const Account = () => {
  return (
    <div>
      <Navbar leftIcon="BURGER" rightIcon="DASHBOARD" title="Account" />
      <Link to="/user-settings" className="manage-account-link button">
        Manage your account
      </Link>
      <LogoutButton />
    </div>
  );
};

export default Account;