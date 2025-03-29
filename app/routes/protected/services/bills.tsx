import Navbar from "~/components/navbar";
import type { Route } from "./+types/bills";
import { mockdata } from "~/mockdata"; // Assuming mockdata contains the bills
import PaidBillComponent from "~/components/dashboard/bills/paidBill";
import UnpaidBillComponent from "~/components/dashboard/bills/unpaidBill";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Bills" },
    { name: "description", content: "View and manage your bills." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    bills: mockdata.bills, // Load all bills from mockdata or an API
  };
};

const Bills = ({ loaderData }: Route.ComponentProps) => {
  const { bills } = loaderData;

  return (
    <div className="bills-page">
      <Navbar title="Bills" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="bills-container">
        <div className="bills-list">
          <h2>Unpaid Bills</h2>
          {bills
            .filter((bill) => !bill.paid)
            .map((bill) => (
              <UnpaidBillComponent key={bill.id} bill={bill} />
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