import { mockdata } from "~/mockdata";
import type { Route } from "./+types/dashboard";
import Chores from "~/components/dashboard/chores";
import Bills from "~/components/dashboard/bills";

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
      <h1>Welcome to your dashboard</h1>
      <Chores
        current={loaderData.incomplete_chores}
        previous={loaderData.complete_chores}
      />
      <Bills bills={loaderData.bills} />
    </>
  );
};

export default Dashboard;
