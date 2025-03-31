import { useState } from "react"; // React hook to manage state
import { useNavigate } from "react-router-dom"; // Hook to navigate between pages
import "../../../styles/addChore.scss"; // Importing the SCSS file for styling

// This is the main component for adding a new chore
const AddChorePage = () => {
  // State variables to keep track of the form inputs
  const [name, setName] = useState(""); // For the chore name
  const [housemates, setHousemates] = useState<string[]>([]); // Multi-select for housemates
  const [intervalValue, setIntervalValue] = useState(""); // Time interval value (e.g., "2")
  const [intervalUnit, setIntervalUnit] = useState("Day(s)"); // Default interval unit (e.g., "Day(s)")
  const [dueDate, setDueDate] = useState(""); // Due date for the chore
  const [description, setDescription] = useState(""); // Optional description for the chore
  const navigate = useNavigate(); // Hook to navigate to another page

  // This function runs when the form is submitted
  const handleAddChore = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from refreshing when the form is submitted

    // Create a new chore object with the form data
    const newChore = {
      id: Date.now().toString(), // Generate a unique ID using the current timestamp
      name, // Chore name from the state
      housemates, // List of housemates responsible for the chore
      interval: `${intervalValue} ${intervalUnit}`, // Combine interval value and unit (e.g., "2 Day(s)")
      dueDate: new Date(dueDate), // Convert the due date to a Date object
      description, // Optional description
    };

    console.log("New chore added:", newChore); // Log the new chore to the console (for debugging)

    // Navigate back to the chores page
    navigate("/chores");
  };

  // This function updates the housemates state when the user selects/deselects options
  const handleHousemateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value); // Get all selected options
    setHousemates(selectedOptions); // Update the state with the selected housemates
  };

  // This function runs when the user clicks the cancel button
  const handleCancel = () => {
    navigate("/chores"); // Go back to the Chores page
  };

  return (
    <div className="add-chore-container">
      {/* Close button in the top-right corner */}
      <button className="close-button" onClick={handleCancel}>
        &times; {/* This is just a fancy way to show an "X" */}
      </button>
      <h1>Add a New Chore</h1>
      {/* The form for adding a new chore */}
      <form onSubmit={handleAddChore}>
        <div>
          <label htmlFor="name">Chore Name:</label>
          <input
            id="name"
            type="text"
            value={name} // Controlled input: value comes from state
            onChange={(e) => setName(e.target.value)} // Update state when the user types
            required // Make this field mandatory
          />
        </div>
        <div>
          <label htmlFor="housemates">Housemates Responsible:</label>
          <select
            id="housemates"
            multiple // Allow multiple selections
            value={housemates} // Controlled input
            onChange={handleHousemateChange} // Update state when options are selected/deselected
            required // Mandatory field
          >
            {/* Options for housemates */}
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </div>
        <div>
          <label htmlFor="intervalValue">Time Interval:</label>
          <input
            id="intervalValue"
            type="number"
            value={intervalValue} // Controlled input
            onChange={(e) => setIntervalValue(e.target.value)} // Update state
            required // Mandatory field
          />
          <select
            id="intervalUnit"
            value={intervalUnit} // Controlled input
            onChange={(e) => setIntervalUnit(e.target.value)} // Update state
            required // Mandatory field
          >
            {/* Options for how often the chore repeats */}
            <option value="Day(s)">Day(s)</option>
            <option value="Week(s)">Week(s)</option>
            <option value="Month(s)">Month(s)</option>
            <option value="Year(s)">Year(s)</option>
          </select>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate} // Controlled input
            onChange={(e) => setDueDate(e.target.value)} // Update state
            required // Mandatory field
          />
        </div>
        <div>
          <label htmlFor="description">Description (Optional):</label>
          <textarea
            id="description"
            value={description} // Controlled input
            onChange={(e) => setDescription(e.target.value)} // Update state
          />
        </div>
        <button type="submit">Add Chore</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default AddChorePage; // Export the component so it can be used elsewhere