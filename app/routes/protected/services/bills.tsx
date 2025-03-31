import Navbar from "~/components/navbar"; // Importing the Navbar component for the top navigation bar
import type { Route } from "./+types/bills"; // Importing the Route type for TypeScript type checking
import { mockdata } from "~/mockdata"; // Importing mock data for bills
import PaidBillComponent from "~/components/dashboard/bills/paidBill"; // Component to display paid bills
import UnpaidBillComponent from "~/components/dashboard/bills/unpaidBill"; // Component to display unpaid bills
import { Link } from "react-router"; // Importing Link for navigation
import { IoMdAddCircle } from "react-icons/io"; // Importing the plus icon for adding a new bill
import "../../../styles/billsPage.scss"; // Importing the SCSS file for styling the Bills page

// Metadata for the page (used for SEO and browser tab titles)
export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Bills" }, // Title of the page
    { name: "description", content: "View and manage your bills." }, // Description of the page
  ];
};

// Loader function to fetch data for the page
export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    bills: mockdata.bills, // Returning the mock bills data
  };
};

// The main Bills component
const Bills = ({ loaderData }: Route.ComponentProps) => {
  const { bills } = loaderData; // Extracting the bills data from the loader

  // Function to mark a bill as paid
  // It takes the ID of the bill to be marked as paid
  const markPaid = async (id: string): Promise<void> => {
    const updatedBills = bills
      .map((bill) =>
        bill.id === id ? { ...bill, paid: true } : bill // Mark the bill as paid
      )
      .filter((bill) => !(bill.id === id && bill.recipient === "Me" && bill.paid)); // Remove the bill if it's paid and the recipient is "Me"
  
    loaderData.bills = updatedBills; // Update the loaderData (mocking state update)
  };

  return (
    <div className="bills-page">
      {/* Navbar at the top of the page */}
      <Navbar title="Bills" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="bills-container">
        {/* Add a plus icon in the top-right corner to navigate to the Add Bill page */}
        <Link to="/bills/add" className="add-bill-icon">
          <IoMdAddCircle size={32} /> {/* Plus icon */}
        </Link>
        <div className="bills-list">
          <h2>Unpaid Bills</h2>
          {/* Filter and display unpaid bills */}
          {bills
            .filter((bill) => !bill.paid) // Only show bills that are not paid
            .map((bill) => (
              <UnpaidBillComponent
                key={bill.id} // Unique key for each bill (required by React)
                bill={bill} // Passing the bill object as a prop
                markPaid={markPaid} // Passing the markPaid function as a prop
              />
            ))}
        </div>
        <span className="break" /> {/* Divider between unpaid and paid bills */}
        <div className="bills-list">
        <h2>Paid Bills</h2>
        {/* Filter and display paid bills */}
        {bills  
          .filter((bill) => bill.paid) // Only show bills that are paid
          .map((bill) => (
            <PaidBillComponent
              key={bill.id} // Unique key for each bill (required by React)
              bill={bill} // Passing the bill object as a prop
              markPaid={markPaid} // Passing the markPaid function as a prop
            />
          ))}
      </div>
      </div>
    </div>
  );
};

export default Bills; // Exporting the Bills component so it can be used elsewhere