import type { Bill } from "~/types/bills";

interface PaidBillProps {
  bill: Bill;
}

const PaidBillComponent = ({ bill }: PaidBillProps) => {
  return (
    <div>
      <h3>{bill.name}</h3>
      <p>{bill.amount}</p>
    </div>
  );
};

export default PaidBillComponent;
