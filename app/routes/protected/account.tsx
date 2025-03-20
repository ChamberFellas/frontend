import type { Route } from "./+types/account";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Account" },
    { name: "description", content: "Manage your account" },
  ];
};

const Account = () => {
  return (
    <div>
      <h1>Account</h1>
      <p>Manage your account</p>
    </div>
  );
};

export default Account;
