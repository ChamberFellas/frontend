import type { IncompleteChore } from "~/types/chores";
import { dateFormatter } from "~/utils/date";
import { TiTickOutline } from "react-icons/ti";

interface IncompleteChoreProps {
  chore: IncompleteChore;
  markComplete: (choreID: string) => Promise<void>;
}

const IncompleteChoreComponent = ({
  chore,
  markComplete,
}: IncompleteChoreProps) => {
  // Causes console error as ssr.
  const time_left = (chore.dueDate.valueOf() - Date.now()) / 1000;

  return (
    <div className="chore-container">
      <p>{chore.name}</p>

      <div className="added-details-container">
        <p>{chore.user}</p>
        <p>{time_left > 0 ? `${dateFormatter(time_left)} left` : "Overdue"}</p>
        <button onClick={() => markComplete(chore.id)}>
          <TiTickOutline />
        </button>
      </div>
    </div>
  );
};

export default IncompleteChoreComponent;
