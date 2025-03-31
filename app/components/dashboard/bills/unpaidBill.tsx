import { FaRegMoneyBillAlt } from "react-icons/fa"; // Importing an icon from react-icons
import type { Bill } from "~/types/bills"; // Importing the Bill type for TypeScript type checking
import { dateFormatter } from "~/utils/date"; // Importing a utility function to format dates

// Defining the props for the UnpaidBillComponent
interface UnpaidBillProps {
  bill: Bill; // The component expects a single bill object as a prop
  markPaid: (id: string) => Promise<void>; // The component expects a function to mark a bill as paid
}

// The UnpaidBillComponent is responsible for displaying an unpaid bill
const UnpaidBillComponent = ({ bill, markPaid }: UnpaidBillProps) => {
  // Calculate the time difference between the bill's due date and the current date in seconds
  const diff = (bill.dueDate.valueOf() - Date.now()) / 1000;

  return (
    <div className="bill-container">
      {/* Display the name of the bill */}
      <p>{bill.name}</p>

      {/* Display additional details about the bill */}
      <div className="added-details-container">
        {/* Display the amount and recipient of the bill */}
        <p> £{bill.amount} to {bill.recipient}</p>
        {/* Display the formatted time difference using the dateFormatter utility */}
        <p> - {dateFormatter(diff)}</p>
        <span className="divider" />
        {/* Button to mark the bill as paid */}
        <button onClick={() => markPaid(bill.id)}>
          <FaRegMoneyBillAlt /> {/* Icon for marking the bill as paid */}
        </button>
      </div>
    </div>
  );
};

export default UnpaidBillComponent; // Exporting the UnpaidBillComponent so it can be used in other parts of the app