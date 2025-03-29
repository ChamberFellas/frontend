import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddChorePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

  const handleAddChore = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate adding the chore (you can replace this with an API call)
    const newChore = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      description,
      dueDate: new Date(dueDate),
    };

    console.log("New chore added:", newChore);

    // Navigate back to the chores page
    navigate("/chores");
  };

  return (
    <div className="add-chore-container">
      <h1>Add a New Chore</h1>
      <form onSubmit={handleAddChore}>
        <div>
          <label htmlFor="name">Chore Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
};

export default AddChorePage;