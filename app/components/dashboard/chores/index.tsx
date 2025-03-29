import { useState } from "react";
import { Link } from "react-router";
import { IoMdAdd } from "react-icons/io";
import type { CompleteChore, IncompleteChore } from "~/types/chores";
import IncompleteChoreComponent from "./incompleteChore";
import CompleteChoreComponent from "./completeChore";
import "./chores.scss";

interface ChoresProps {
  incompleteChores: IncompleteChore[];
  completedChores: CompleteChore[];
}

const Chores = ({
  incompleteChores: initialIncompleteChores,
  completedChores: initialCompletedChores,
}: ChoresProps) => {
  const [incompleteChores, setIncompleteChores] = useState(initialIncompleteChores);
  const [completedChores, setCompletedChores] = useState(initialCompletedChores);

  const markComplete = async (id: string): Promise<void> => {
    const chore = incompleteChores.find((chore) => chore.id === id);
    if (!chore) return;

    const completedChore: CompleteChore = {
      ...chore,
      completedDate: new Date(),
      flagged: false,
    };

    setCompletedChores((prev) => [...prev, completedChore]);
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  return (
    <div className="chores-container">
      <div className="chores-header">
        {/* Wrap the header in a Link to navigate to /chores */}
        <Link to="/chores" className="chores-header-link">
          Chores
        </Link>
        {/* Wrap the button in a Link to navigate to /chores/add */}
        <Link to="/chores/add" className="add-button">
          <IoMdAdd />
        </Link>
      </div>
      <div className="chores-list">
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
        {completedChores.map((chore) => (
          <CompleteChoreComponent key={chore.id} chore={chore} />
        ))}
      </div>
    </div>
  );
};

export default Chores;