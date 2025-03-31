import Navbar from "~/components/navbar";
import type { Route } from "./+types/bills";
import { mockdata } from "~/mockdata";
import PaidBillComponent from "~/components/dashboard/bills/paidBill";
import UnpaidBillComponent from "~/components/dashboard/bills/unpaidBill";
import { Link } from "react-router"; // Import Link for navigation
import { IoMdAddCircle } from "react-icons/io"; // Import the plus icon
import "../../../styles/billsPage.scss"; // Import the new SCSS file

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Bills" },
    { name: "description", content: "View and manage your bills." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    bills: mockdata.bills,
  };
};


const Bills = ({ loaderData }: Route.ComponentProps) => {
  const { bills } = loaderData;

  // Define the markPaid function
  const markPaid = async (id: string): Promise<void> => {
    const updatedBills = bills.map((bill) =>
      bill.id === id ? { ...bill, paid: true } : bill
    );
    loaderData.bills = updatedBills; // Update the loaderData (mocking state update)
  };

  return (
    <div className="bills-page">
      <Navbar title="Bills" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="bills-container">
        {/* Add the plus icon in the top-right corner */}
        <Link to="/bills/add" className="add-bill-icon">
          <IoMdAddCircle size={32} />
        </Link>
        <div className="bills-list">
          <h2>Unpaid Bills</h2>
          {bills
            .filter((bill) => !bill.paid)
            .map((bill) => (
              <UnpaidBillComponent
                key={bill.id}
                bill={bill}
                markPaid={markPaid} // Pass the markPaid function
              />
            ))}
        </div>
        <span className="break" />
        <div className="bills-list">
          <h2>Paid Bills</h2>
          {bills
            .filter((bill) => bill.paid)
            .map((bill) => (
              <PaidBillComponent key={bill.id} bill={bill} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Bills;