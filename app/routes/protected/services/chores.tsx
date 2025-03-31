import Navbar from "~/components/navbar"; // Importing the Navbar component for the top navigation bar
import type { Route } from "./+types/chores"; // Importing the Route type for TypeScript type checking
import { mockdata } from "~/mockdata"; // Importing mock data for chores
import IncompleteChoreComponent from "~/components/dashboard/chores/incompleteChore"; // Component to display incomplete chores
import CompleteChoreComponent from "~/components/dashboard/chores/completeChore"; // Component to display completed chores
import { Link } from "react-router"; // Importing Link for navigation
import { IoMdAddCircle } from "react-icons/io"; // Importing the plus icon for adding a new chore
import "../../../styles/choresPage.scss"; // Importing the SCSS file for styling the Chores page
import { useState } from "react"; // React hook to manage state

// Metadata for the page (used for SEO and browser tab titles)
export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Chores" }, // Title of the page
    { name: "description", content: "View and manage your chores." }, // Description of the page
  ];
};

// Loader function to fetch data for the page
export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    incompleteChores: mockdata.incomplete_chores, // Returning mock data for incomplete chores
    completedChores: mockdata.complete_chores, // Returning mock data for completed chores
  };
};

// The main Chores component
const Chores = ({ loaderData }: Route.ComponentProps) => {
  // State variables to manage the list of incomplete and completed chores
  const [incompleteChores, setIncompleteChores] = useState(loaderData.incompleteChores);
  const [completedChores, setCompletedChores] = useState(loaderData.completedChores);

  // Function to mark a chore as complete
  // It takes the ID of the chore to be marked as complete
  const markComplete = async (id: string) => {
    // Find the chore in the incomplete chores list
    const chore = incompleteChores.find((chore) => chore.id === id);
    if (!chore) return; // If the chore is not found, exit the function

    // Create a new completed chore object
    const completedChore = {
      ...chore, // Copy all properties from the incomplete chore
      completedDate: new Date(), // Add the current date as the completed date
      flagged: false, // Default flagged status
      user: "Me", // Replace this with the actual user (e.g., from context or props)
    };

    // Update the state: Add the chore to the completed chores list
    setCompletedChores((prev) => [...prev, completedChore]);
    // Remove the chore from the incomplete chores list
    setIncompleteChores((prev) => prev.filter((chore) => chore.id !== id));
  };

  // Function to toggle the flagged status of a completed chore
  // It takes the ID of the chore and the new flagged status
  const flagChore = async (id: string, flagged: boolean) => {
    // Update the state: Modify the flagged status of the specified chore
    setCompletedChores((prev) =>
      prev.map((chore) =>
        chore.id === id ? { ...chore, flagged } : chore // Update the flagged status if the ID matches
      )
    );
  };

  return (
    <div className="chores-page">
      {/* Navbar at the top of the page */}
      <Navbar title="Chores" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="chores-container">
        {/* Add the plus icon in the top-right corner to navigate to the Add Chore page */}
        <Link to="/chores/add" className="add-chore-icon">
          <IoMdAddCircle size={32} /> {/* Plus icon */}
        </Link>
        <div className="chores-list">
          <h2>Incomplete Chores</h2>
          {/* Display the list of incomplete chores */}
          {incompleteChores.map((chore) => (
            <IncompleteChoreComponent
              key={chore.id} // Unique key for each chore (required by React)
              chore={chore} // Passing the chore object as a prop
              markComplete={markComplete} // Passing the markComplete function as a prop
            />
          ))}
        </div>
        <span className="break" /> {/* Divider between incomplete and completed chores */}
        <div className="chores-list">
          <h2>Completed Chores</h2>
          {/* Display the list of completed chores */}
          {completedChores.map((chore) => (
            <CompleteChoreComponent
              key={chore.id} // Unique key for each chore (required by React)
              chore={chore} // Passing the chore object as a prop
              flagChore={flagChore} // Passing the flagChore function as a prop
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chores; // Exporting the Chores component so it can be used elsewhere