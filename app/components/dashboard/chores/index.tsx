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
  // It takes the ID of the chore to be marked as complete
  const markComplete = async (id: string): Promise<void> => {
    // Find the chore in the incomplete chores list
    const chore = incompleteChores.find((chore) => chore.id === id);
    if (!chore) return; // If the chore is not found, exit the function

    // Create a new completed chore object
    const completedChore: CompleteChore = {
      ...chore, // Copy all properties from the incomplete chore
      completedDate: new Date(), // Add the current date as the completed date
      flagged: false, // Set the flagged status to false by default
      user: "Me", // Replace this with the actual user (e.g., from context or props)
    };

    // Update the state: Add the chore to the completed chores list
    setCompletedChores((prev) => [...prev, completedChore]);
    // Remove the chore from the incomplete chores list
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  // Function to flag or unflag a completed chore
  // It takes the ID of the chore and the new flagged status
  const flagChore = async (id: string, flagged: boolean): Promise<void> => {
    // Update the state: Modify the flagged status of the specified chore
    setCompletedChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, flagged } : chore // Update the flagged status if the ID matches
      )
    );
  };

  return (
    <div className="chores-container">
      {/* Header section */}
      <div className="chores-header">
        {/* Link to navigate to the /chores page */}
        <Link to="/chores" className="chores-header-link">
          Chores
        </Link>
        {/* Link to navigate to the /chores/add page for adding a new chore */}
        <Link to="/chores/add" className="add-button">
          <IoMdAdd /> {/* Add icon */}
        </Link>
      </div>

      {/* List of incomplete chores */}
      <div className="chores-list">
        {incompleteChores.map((chore) => (
          <IncompleteChoreComponent
            key={chore.id} // Unique key for each chore (required by React)
            chore={chore} // Passing the chore object as a prop
            markComplete={markComplete} // Passing the markComplete function as a prop
          />
        ))}
      </div>

      {/* Divider */}
      <span className="break" />

      {/* List of completed chores */}
      <div className="chores-list">
        {completedChores.map((chore) => (
          <CompleteChoreComponent
            key={chore.id} // Unique key for each chore (required by React)
            chore={chore} // Passing the chore object as a prop
            flagChore={flagChore} // Passing the flagChore function as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default Chores; // Exporting the Chores component so it can be used in other parts of the app