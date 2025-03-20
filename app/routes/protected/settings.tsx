import type { Route } from "./+types/account";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Settings" },
    { name: "description", content: "Manage your settings" },
  ];
};

const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
      <p>Manage your settings</p>
    </div>
  );
};

export default Settings;
