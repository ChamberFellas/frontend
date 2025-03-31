import { useState } from "react"; // Importing React's useState hook to manage component state
import { Link } from "react-router"; // Importing Link from react-router for navigation
import { IoMdAdd } from "react-icons/io"; // Importing an icon from react-icons
import type { CompleteChore, IncompleteChore } from "~/types/chores"; // Importing types for chores
import IncompleteChoreComponent from "./incompleteChore"; // Importing the component for displaying incomplete chores
import CompleteChoreComponent from "./completeChore"; // Importing the component for displaying completed chores
import "./chores.scss"; // Importing the SCSS file for styling

// Defining the props for the Chores component
interface ChoresProps {
  incompleteChores: IncompleteChore[]; // The component expects an array of incomplete chores as a prop
  completedChores: CompleteChore[]; // The component expects an array of completed chores as a prop
}

// The main Chores component
const Chores = ({
  incompleteChores: initialIncompleteChores, // Initial list of incomplete chores
  completedChores: initialCompletedChores, // Initial list of completed chores
}: ChoresProps) => {
  // Using useState to manage the state of incomplete and completed chores
  const [incompleteChores, setIncompleteChores] = useState(initialIncompleteChores);
  const [completedChores, setCompletedChores] = useState(initialCompletedChores);

  // Function to mark a chore as complete
  const markComplete = async (id: string): Promise<void> => {
    const chore = incompleteChores.find((chore) => chore.id === id);
    if (!chore) return;

    const completedChore: CompleteChore = {
      ...chore,
      completedDate: new Date(),
      flagged: false,
      user: "Me",
    };

    setCompletedChores((prev) => [...prev, completedChore]);
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  // Function to flag or unflag a completed chore
  const flagChore = async (id: string, flagged: boolean): Promise<void> => {
    setCompletedChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, flagged } : chore
      )
    );
  };

  // Get the top 3 incomplete chores with the closest due dates
  const topIncompleteChores = incompleteChores
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // Sort by due date (earliest first)
    .slice(0, 3); // Take the top 2

  // Get the top 2 completed chores with the most recent completed dates
  const topCompletedChores = completedChores
    .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()) // Sort by completed date (most recent first)
    .slice(0, 1); // Take the top 1

  return (
    <div className="chores-container">
      {/* Header section */}
      <div className="chores-header">
        <Link to="/chores" className="chores-header-link">
          Chores
        </Link>
        <Link to="/chores/add" className="add-button">
          <IoMdAdd />
        </Link>
      </div>

      {/* List of top 3 incomplete chores */}
      <div className="chores-list">
        {topIncompleteChores.map((chore) => (
          <IncompleteChoreComponent
            key={chore.id}
            chore={chore}
            markComplete={markComplete}
          />
        ))}
      </div>

      {/* Divider */}
      <span className="break" />

      {/* List of top 2 completed chores */}
      <div className="chores-list">
        {topCompletedChores.map((chore) => (
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