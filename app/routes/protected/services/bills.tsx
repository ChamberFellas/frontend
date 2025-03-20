import type { Route } from "./+types/bills";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Bills" },
    { name: "description", content: "View and manage your bills." },
  ];
};

const Bills = () => {
  return (
    <div>
      <h1>Bills</h1>
      <p>View and manage your bills.</p>
    </div>
  );
};

export default Bills;
