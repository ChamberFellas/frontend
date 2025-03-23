import { useState } from "react";
import type { CompleteChore, IncompleteChore } from "~/types/chores";
import IncompleteChoreComponent from "./incompleteChore";
import CompleteChoreComponent from "./completeChore";
import { Link } from "react-router";

interface ChoresProps {
  current: IncompleteChore[];
  previous: CompleteChore[];
}

const Chores = ({ current, previous }: ChoresProps) => {
  const [completedChores, setCompletedChores] =
    useState<CompleteChore[]>(previous);
  const [incompleteChores, setIncompleteChores] =
    useState<IncompleteChore[]>(current);

  const markComplete = async (id: string) => {
    const chore = incompleteChores.find((chore) => chore.id === id);

    if (!chore) return;

    const completedChore: CompleteChore = {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      user: chore.user,
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
          return { ...chore, flagged: true };
        }
        return chore;
      })
    );
  };

  return (
    <>
      <Link to="/chores">Chores</Link>
      <div>
        {incompleteChores.map((chore) => (
          <IncompleteChoreComponent
            key={chore.id}
            chore={chore}
            markComplete={markComplete}
          />
        ))}
      </div>
      <br></br>
      <div>
        {completedChores.map((chore) => (
          <CompleteChoreComponent
            key={chore.id}
            chore={chore}
            flagChore={flagChore}
          />
        ))}
      </div>
    </>
  );
};

export default Chores;
