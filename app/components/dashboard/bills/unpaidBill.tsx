import type { Bill } from "~/types/bills";

interface UnpaidBillProps {
  bill: Bill;
  markPaid: (id: string) => Promise<void>;
}

const UnpaidBillComponent = ({ bill, markPaid }: UnpaidBillProps) => {
  return (
    <div>
      <h3>{bill.name}</h3>
      <p>{bill.amount}</p>
      <p>{bill.dueDate.toString()}</p>

      <button onClick={() => markPaid(bill.id)}>Mark Paid</button>
    </div>
  );
};

export default UnpaidBillComponent;
