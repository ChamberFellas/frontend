import type { Bill } from "~/types/bills";

interface PaidBillProps {
  bill: Bill;
}

const PaidBillComponent = ({ bill }: PaidBillProps) => {
  return (
    <div className="bill-container">
      <p>{bill.name}</p>
      <div className="added-details-container">
        <p>£{bill.amount}</p>
      </div>
    </div>
  );
};

export default PaidBillComponent;
