import { useState } from "react";
import { Link } from "react-router";
import { IoMdAdd } from "react-icons/io";
import type { Bill } from "~/types/bills";
import PaidBillComponent from "./paidBill";
import UnpaidBillComponent from "./unpaidBill";
import "./bills.scss";

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
    <div className="bills-container">
      <div className="bills-header">
        <Link to="/bills">Bills</Link>
        <button className="add-button">
          <IoMdAdd />
        </button>
      </div>
      <div className="bills-list">
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
      <span className="break" />
      <div className="bills-list">
        {bills
          .filter((bill) => bill.paid)
          .map((bill) => (
            <PaidBillComponent key={bill.id} bill={bill} />
          ))}
      </div>
    </div>
  );
};

export default Bills;
