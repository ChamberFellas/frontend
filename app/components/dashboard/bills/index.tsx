import { useState } from "react";
import type { CompleteChore, IncompleteChore } from "~/types/chores";
import { Link } from "react-router";
import type { Bill } from "~/types/bills";
import PaidBillComponent from "./paidBill";
import UnpaidBillComponent from "./unpaidBill";

interface BillsProps {
  bills: Bill[];
}

const Bills = ({ bills: initialBills }: BillsProps) => {
  const [bills, setBills] = useState(initialBills);

  const markPaid = async (id: string): Promise<void> => {
    // return fetch(`/api/bills/${id}/mark-paid`, {
    //   method: "POST",
    // }).then(() => {
    //   setBills((prevBills) =>
    //     prevBills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill))
    //   );
    // });
    //
    setBills((prevBills) =>
      prevBills.map((bill) => (bill.id === id ? { ...bill, paid: true } : bill))
    );
  };

  return (
    <>
      <Link to="/bills">Bills</Link>
      <div>
        {bills
          .filter((bill) => !bill.paid)
          .map((bill) => (
            <UnpaidBillComponent
              key={bill.id}
              bill={bill}
              markPaid={markPaid}
            />
          ))}
      </div>
      <br></br>
      <div>
        {bills
          .filter((bill) => bill.paid)
          .map((bill) => (
            <PaidBillComponent key={bill.id} bill={bill} />
          ))}
      </div>
    </>
  );
};

export default Bills;
