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
  const [completedChores, setCompletedChores] = useState<CompleteChore[]>(
    initialCompletedChores
  );
  const [incompleteChores, setIncompleteChores] = useState<IncompleteChore[]>(
    initialIncompleteChores
  );

  const markComplete = async (id: string) => {
    const chore = incompleteChores.find((chore) => chore.id === id);

    if (!chore) return;

    const completedChore: CompleteChore = {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      user: "Me",
      flagged: false,
      completedDate: new Date(),
    };

    setCompletedChores((prev) => [...prev, completedChore]);
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  const flagChore = async (id: string) => {
    const chore = completedChores.find((chore) => chore.id === id);
  
    if (!chore) return;
  
    setCompletedChores((prev) =>
      prev.map((chore) => {
        if (chore.id === id) {
          return { ...chore, flagged: !chore.flagged }; // Toggle the flagged state
        }
        return chore;
      })
    );
  };

  return (
    <div className="chores-container">
    <div className="chores-header">
      <Link to="/chores">Chores</Link>
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
          <CompleteChoreComponent
            key={chore.id}
            chore={chore}
            flagChore={flagChore}
          />
        ))}
      </div>
    </div>
  );
};

export default Chores;
