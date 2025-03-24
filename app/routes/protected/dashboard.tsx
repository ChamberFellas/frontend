import { mockdata } from "~/mockdata";
import type { Route } from "./+types/dashboard";
import Chores from "~/components/dashboard/chores";
import Bills from "~/components/dashboard/bills";
import Navbar from "~/components/navbar";

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
      <Chores
        current={loaderData.incomplete_chores}
        previous={loaderData.complete_chores}
      />
      <Bills bills={loaderData.bills} />
    </>
  );
};

export default Dashboard;
