import { IoMdCheckmark } from "react-icons/io"; // Importing the tick icon
import type { Bill } from "~/types/bills"; // Importing the Bill type for TypeScript type checking

// Defining the props for the PaidBillComponent
interface PaidBillProps {
  bill: Bill; // The component expects a single bill object as a prop
  markPaid: (id: string) => Promise<void>; // Function to handle marking as paid
}

// The PaidBillComponent is responsible for displaying a paid bill
const PaidBillComponent = ({ bill, markPaid }: PaidBillProps) => {
  return (
    <div className="bill-container">
      {/* Display the name of the bill */}
      <p>{bill.name}</p>

      {/* Display additional details about the bill */}
      <div className="added-details-container">
        {/* Display the amount of the bill */}
        <p>£{bill.amount}</p>
        {/* Conditionally render the pink tick icon only if recipient is "Me" */}
        {bill.recipient === "Me" && (
          <button onClick={() => markPaid(bill.id)}>
            <IoMdCheckmark className="pink-tick-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PaidBillComponent; // Exporting the PaidBillComponent so it can be used in other parts of the app