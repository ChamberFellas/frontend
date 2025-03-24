import Navbar from "~/components/navbar";
import type { Route } from "./+types/chores";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Chores" },
    { name: "description", content: "View and manage your chores." },
  ];
};

const Chores = () => {
  return (
    <div>
      <Navbar leftIcon="BURGER" rightIcon="DASHBOARD" title="Chores" />
      <p>View and manage your chores.</p>
    </div>
  );
};

export default Chores;
