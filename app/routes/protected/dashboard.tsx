import { mockdata } from "~/mockdata";
import type { Route } from "./+types/dashboard";
import Chores from "~/components/dashboard/chores";
import Bills from "~/components/dashboard/bills";
import Navbar from "~/components/navbar";
import Notifications from "~/components/dashboard/notifications";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Users personal dashboard" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const data = mockdata;

  return data;
};

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  return (
    <>
      <Navbar leftIcon="BURGER" rightIcon="ACCOUNT" title="Dashboard" />
      {/* <Notifications /> */}
      {/* Remove this component if notifications are not needed */}
      <Chores
        incompleteChores={loaderData.incomplete_chores}
        completedChores={loaderData.complete_chores}
      />
      <Bills bills={loaderData.bills} />
    </>
  );
};

export default Dashboard;