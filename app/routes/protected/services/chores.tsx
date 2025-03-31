import Navbar from "~/components/navbar";
import type { Route } from "./+types/chores";
import { mockdata } from "~/mockdata";
import IncompleteChoreComponent from "~/components/dashboard/chores/incompleteChore";
import CompleteChoreComponent from "~/components/dashboard/chores/completeChore";
import { Link } from "react-router";
import { IoMdAddCircle } from "react-icons/io";
import "../../../styles/choresPage.scss";
import { useState } from "react";

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

const Chores = ({ loaderData }: Route.ComponentProps) => {
  const [incompleteChores, setIncompleteChores] = useState(loaderData.incompleteChores);
  const [completedChores, setCompletedChores] = useState(loaderData.completedChores);

  const markComplete = async (id: string) => {
    const chore = incompleteChores.find((chore) => chore.id === id);
    if (!chore) return;
  
    const completedChore = {
      ...chore,
      completedDate: new Date(),
      flagged: false, // Default flagged status
      user: "Default User", // Replace this with the actual user (e.g., from context or props)
    };
  
    setCompletedChores((prev) => [...prev, completedChore]);
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  // Function to toggle the flagged status of a completed chore
  const flagChore = async (id: string, flagged: boolean) => {
    setCompletedChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, flagged } : chore
      )
    );
  };

  return (
    <div className="chores-page">
      <Navbar title="Chores" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="chores-container">
        {/* Add the plus icon in the top-right corner */}
        <Link to="/chores/add" className="add-chore-icon">
          <IoMdAddCircle size={32} />
        </Link>
        <div className="chores-list">
          <h2>Incomplete Chores</h2>
          {incompleteChores.map((chore) => (
            <IncompleteChoreComponent
              key={chore.id}
              chore={chore}
              markComplete={markComplete}
            />
          ))}
        </div>
        <span className="break" />
        <div className="chores-list">
          <h2>Completed Chores</h2>
          {completedChores.map((chore) => (
            <CompleteChoreComponent
              key={chore.id}
              chore={chore}
              flagChore={flagChore} // Pass the flagChore function
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chores;