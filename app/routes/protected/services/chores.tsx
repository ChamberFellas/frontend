import Navbar from "~/components/navbar";
import type { Route } from "./+types/chores";
import { mockdata } from "~/mockdata";
import { useState } from "react";
import Chores from "~/components/dashboard/chores";


export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Chores" },
    { name: "description", content: "View and manage your chores." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    incompleteChores: mockdata.incomplete_chores,
    completedChores: mockdata.complete_chores,
  };
};

const ChorePage = ({ loaderData }: Route.ComponentProps) => {
  const [incompleteChores, setIncompleteChores] = useState(
    loaderData.incompleteChores
  );
  const [completedChores, setCompletedChores] = useState(
    loaderData.completedChores
  );

  return (
    <div>
      <Navbar leftIcon="BURGER" rightIcon="DASHBOARD" title="Chores" />
      <Chores
        incompleteChores={incompleteChores}
        completedChores={completedChores}
      />

    </div>
  );
};

export default ChorePage;
