import { FaRegMoneyBillAlt } from "react-icons/fa";
import type { Bill } from "~/types/bills";
import { dateFormatter } from "~/utils/date";

interface UnpaidBillProps {
  bill: Bill;
  markPaid: (id: string) => Promise<void>;
}

const UnpaidBillComponent = ({ bill, markPaid }: UnpaidBillProps) => {
  const diff = (bill.dueDate.valueOf() - Date.now()) / 1000;

  return (
    <div className="bill-container">
      <p>{bill.name}</p>

      <div className="added-details-container">
        <p> £{bill.amount} to {bill.recipient}</p>
        <p> - {dateFormatter(diff)}</p>
        <span className="divider" />
        <button onClick={() => markPaid(bill.id)}>
          <FaRegMoneyBillAlt />
        </button>
      </div>
    </div>
  );
};

export default UnpaidBillComponent;
