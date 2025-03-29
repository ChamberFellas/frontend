import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/addBill.scss"; // Correct relative path to the SCSS file

const AddBillPage = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(""); // Amount field for the bill
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddBill = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate adding the bill (you can replace this with an API call)
    const newBill = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      amount: parseFloat(amount), // Convert amount to a number
      dueDate: new Date(dueDate),
      description,
    };

    console.log("New bill added:", newBill);

    // Navigate back to the bills page
    navigate("/bills");
  };

  const handleCancel = () => {
    navigate("/bills"); // Navigate back to the Bills Home Page
  };

  return (
    <div className="add-bill-container">
      {/* Add a cross button in the top-right corner */}
      <button className="close-button" onClick={handleCancel}>
        &times;
      </button>
      <h1>Add a New Bill</h1>
      <form onSubmit={handleAddBill}>
        <div>
          <label htmlFor="name">Bill Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0" // Ensure only positive integers
            step="1" // Ensure only whole numbers
          />
        </div>
        <div>
          <label htmlFor="dueDate">Due Date:</label>
          <input
            id="dueDate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description (Optional):</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">Add Bill</button>
      </form>
    </div>
  );
};

export default AddBillPage;