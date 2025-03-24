import Navbar from "~/components/navbar";
import type { Route } from "./+types/account";
import LogoutButton from "~/components/navbar/logoutButton";

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
      <p>Manage your account</p>
      <LogoutButton />
    </div>
  );
};

export default Account;
