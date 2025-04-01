import { useState } from "react"; // React hook to manage state
import { useNavigate } from "react-router-dom"; // Hook to navigate between pages
import "../../../styles/addBill.scss"; // Importing the SCSS file for styling
import axios from 'axios';


// This is the main component for adding a new bill
const AddBillPage = () => {
  // State variables to keep track of the form inputs
  const [name, setName] = useState(""); // For the bill name
  const [amount, setAmount] = useState(""); // For the bill amount
  const [dueDate, setDueDate] = useState(""); // For the bill's due date
  const [description, setDescription] = useState(""); // Optional description for the bill
  const [intervalUnit, setIntervalUnit] = useState("Monthly"); // How often the bill repeats (default: Monthly)
  const [housemates, setHousemates] = useState<string[]>([]); // List of housemates responsible for the bill
  const navigate = useNavigate(); // Hook to navigate to another page

  // This function runs when the form is submitted
  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the page from refreshing when the form is submitted


    // Create a new bill object with the form data
    const newBill = {
      id: Date.now().toString(), // Generate a unique ID using the current timestamp
      name, // Bill name from the state
      amount: parseFloat(amount), // Convert the amount to a number
      dueDate: new Date(dueDate), // Convert the due date to a Date object
      description, // Optional description
      interval: intervalUnit, // How often the bill repeats
      housemates, // List of housemates responsible

    };

    const BILL_URL = "http:/" + process.env.AIP + ":3000/add-bill";

    // axios.post(BILL_URL, 1, name, amount, "Unpaid", dueDate, interval, housemates)
    console.log("New bill added:", newBill); // Log the new bill to the console (for debugging)

    // Navigate back to the bills page after adding the bill
    navigate("/bills");
  };

  // This function updates the housemates state when the user selects/deselects options
  const handleHousemateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value); // Get all selected options
    setHousemates(selectedOptions); // Update the state with the selected housemates
  };

  // This function runs when the user clicks the cancel button
  const handleCancel = () => {
    navigate("/bills"); // Go back to the Bills page
  };

  return (
    <div className="add-bill-container">
      {/* Close button in the top-right corner */}
      <button className="close-button" onClick={handleCancel}>
        &times; {/* This is just a fancy way to show an "X" */}
      </button>
      <h1>Add a New Bill</h1>
      {/* The form for adding a new bill */}
      <form onSubmit={handleAddBill}>
        <div>
          <label htmlFor="name">Bill Name:</label>
          <input
            id="name"
            type="text"
            value={name} // Controlled input: value comes from state
            onChange={(e) => setName(e.target.value)} // Update state when the user types
            required // Make this field mandatory
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount} // Controlled input
            onChange={(e) => setAmount(e.target.value)} // Update state
            required // Mandatory field
            min="0" // Only allow positive numbers
            step="1" // Only allow whole numbers
          />
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
          <label htmlFor="intervalUnit">How Often Repeats:</label>
          <select
            id="intervalUnit"
            value={intervalUnit} // Controlled input
            onChange={(e) => setIntervalUnit(e.target.value)} // Update state
            required // Mandatory field
          >
            {/* Options for how often the bill repeats */}
            <option value="Weekly">Weekly</option>
            <option value="Biweekly">Biweekly</option>
            <option value="Monthly">Monthly</option>
            <option value="None">None</option>
          </select>
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
            <option value="Charlie">Charlie</option>
          </select>
        </div>
        <button type="submit">Add Bill</button> {/* Submit button */}
      </form>
    </div>
  );
};

export default AddBillPage; // Export the component so it can be used elsewhere