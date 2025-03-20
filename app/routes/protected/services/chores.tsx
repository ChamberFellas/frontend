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
      <h1>Chores</h1>
      <p>View and manage your chores.</p>
    </div>
  );
};

export default Chores;
