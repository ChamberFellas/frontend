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
  const [bills, setBills] = useState(initialBills);

  const markPaid = async (id: string): Promise<void> => {
    setBills((prevBills) =>
      prevBills.map((bill) =>
        bill.id === id
          ? { ...bill, paid: true, paidDate: new Date() } // Add paidDate when marking as paid
          : bill
      )
    );
  };

  // Get the top 3 unpaid bills with the closest due dates
  const topUnpaidBills = bills
    .filter((bill) => !bill.paid) // Filter unpaid bills
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) // Sort by due date (earliest first)
    .slice(0, 2); // Take the top 2

  // Get the top 2 paid bills with the most recent due dates
  const topPaidBills = bills
    .filter((bill) => bill.paid) // Filter paid bills
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()) // Sort by due date (most recent first)
    .slice(0, 1); // Take the top 1

  return (
    <div className="bills-container">
      {/* Header section */}
      <div className="bills-header">
        <Link to="/bills" className="bills-header-link">
          Bills
        </Link>
        <Link to="/bills/add" className="add-button">
          <IoMdAdd />
        </Link>
      </div>

      {/* List of top 3 unpaid bills */}
      <div className="bills-list">
        {topUnpaidBills.map((bill) => (
          <UnpaidBillComponent key={bill.id} bill={bill} markPaid={markPaid} />
        ))}
      </div>

      {/* Divider */}
      <span className="break" />

      {/* List of top 2 paid bills */}
      <div className="bills-list">
      {topPaidBills.map((bill) => (
        <PaidBillComponent key={bill.id} bill={bill} markPaid={markPaid} />
  ))}
</div>
    </div>
  );
};

export default Bills;