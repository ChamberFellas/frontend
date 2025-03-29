import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/addChore.scss"; // Correct relative path to the SCSS file


const AddChorePage = () => {
  const [name, setName] = useState("");
  const [housemates, setHousemates] = useState<string[]>([]); // Multi-select for housemates
  const [intervalValue, setIntervalValue] = useState(""); // Time interval value
  const [intervalUnit, setIntervalUnit] = useState("Day(s)"); // Default interval unit
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAddChore = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate adding the chore (you can replace this with an API call)
    const newChore = {
      id: Date.now().toString(), // Generate a unique ID
      name,
      housemates,
      interval: `${intervalValue} ${intervalUnit}`,
      dueDate: new Date(dueDate),
      description,
    };

    console.log("New chore added:", newChore);

    // Navigate back to the chores page
    navigate("/chores");
  };

  const handleHousemateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setHousemates(selectedOptions);
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
          <label htmlFor="housemates">Housemates Responsible:</label>
          <select
            id="housemates"
            multiple
            value={housemates}
            onChange={handleHousemateChange}
            required
          >
            <option value="Alice">Alice</option>
            <option value="Bob">Bob</option>
          </select>
        </div>
        <div>
          <label htmlFor="intervalValue">Time Interval:</label>
          <input
            id="intervalValue"
            type="number"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
            required
          />
          <select
            id="intervalUnit"
            value={intervalUnit}
            onChange={(e) => setIntervalUnit(e.target.value)}
            required
          >
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
        <button type="submit">Add Chore</button>
      </form>
    </div>
  );
};

export default AddChorePage;