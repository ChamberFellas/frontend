import { useState } from "react"; // Importing React's useState hook to manage component state
import { Link } from "react-router"; // Importing Link from react-router for navigation
import { IoMdAdd } from "react-icons/io"; // Importing an icon from react-icons
import type { Bill } from "~/types/bills"; // Importing the Bill type for TypeScript type checking
import PaidBillComponent from "./paidBill"; // Importing the PaidBillComponent for displaying paid bills
import UnpaidBillComponent from "./unpaidBill"; // Importing the UnpaidBillComponent for displaying unpaid bills
import "./bills.scss"; // Importing the SCSS file for styling

// Defining the props for the Bills component
interface BillsProps {
  bills: Bill[]; // The component expects an array of bills as a prop
}

// The main Bills component
const Bills = ({ bills: initialBills }: BillsProps) => {
  // Using useState to manage the state of bills
  // `initialBills` is the initial value for the state
  const [bills, setBills] = useState(initialBills);

  // Function to mark a bill as paid
  // It takes the ID of the bill to be marked as paid
  const markPaid = async (id: string): Promise<void> => {
    // Updating the state by mapping through the bills
    // If the bill's ID matches the given ID, update its `paid` property to true
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill))
    );
  };

  return (
    <div className="bills-container">
      {/* Header section */}
      <div className="bills-header">
        {/* Link to navigate to the /bills page */}
        <Link to="/bills" className="bills-header-link">
          Bills
        </Link>
        {/* Link to navigate to the /bills/add page for adding a new bill */}
        <Link to="/bills/add" className="add-button">
          <IoMdAdd /> {/* Add icon */}
        </Link>
      </div>

      {/* List of unpaid bills */}
      <div className="bills-list">
        {bills
          .filter((bill) => !bill.paid) // Filter bills to show only unpaid ones
          .map((bill) => (
            <UnpaidBillComponent
              key={bill.id} // Unique key for each bill (required by React)
              bill={bill} // Passing the bill object as a prop
              markPaid={markPaid} // Passing the markPaid function as a prop
            />
          ))}
      </div>

      {/* Divider */}
      <span className="break" />

      {/* List of paid bills */}
      <div className="bills-list">
        {bills
          .filter((bill) => bill.paid) // Filter bills to show only paid ones
          .map((bill) => (
            <PaidBillComponent
              key={bill.id} // Unique key for each bill (required by React)
              bill={bill} // Passing the bill object as a prop
            />
          ))}
      </div>
    </div>
  );
};

export default Bills; // Exporting the Bills component so it can be used in other parts of the app