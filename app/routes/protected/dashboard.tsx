import Dashboard from "~/pages/dashboard";
import type { Route } from "./+types/dashboard";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Users personal dashboard" },
  ];
};

export default Dashboard;
