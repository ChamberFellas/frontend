import Navbar from "~/components/navbar";
import type { Route } from "./+types/chores";
import { mockdata } from "~/mockdata";
import IncompleteChoreComponent from "~/components/dashboard/chores/incompleteChore";
import CompleteChoreComponent from "~/components/dashboard/chores/completeChore";
import { Link } from "react-router"; // Import Link for navigation
import { IoMdAddCircle } from "react-icons/io"; // Import the plus icon
import "../../../styles/choresPage.scss"; // Import the new SCSS file

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Chores" },
    { name: "description", content: "View and manage your chores." },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  return {
    incompleteChores: mockdata.incomplete_chores,
    completedChores: mockdata.complete_chores,
  };
};

const Chores = ({ loaderData }: Route.ComponentProps) => {
  const { incompleteChores, completedChores } = loaderData;

  return (
    <div className="chores-page">
      <Navbar title="Chores" leftIcon="BACK" rightIcon="ACCOUNT" />
      <div className="chores-container">
        {/* Add the plus icon in the top-right corner */}
        <Link to="/chores/add" className="add-chore-icon">
          <IoMdAddCircle size={32} />
        </Link>
        <div className="chores-list">
          <h2>Incomplete Chores</h2>
          {incompleteChores.map((chore) => (
            <IncompleteChoreComponent key={chore.id} chore={chore} />
          ))}
        </div>
        <span className="break" />
        <div className="chores-list">
          <h2>Completed Chores</h2>
          {completedChores.map((chore) => (
            <CompleteChoreComponent key={chore.id} chore={chore} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chores;