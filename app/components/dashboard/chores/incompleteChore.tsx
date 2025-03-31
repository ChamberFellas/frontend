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
  const timeLeft = (chore.dueDate.getTime() - Date.now()) / 1000;

  return (
    <div className="chore-container">
      <p>{chore.name}</p>

      <div className="added-details-container">
        <p>{timeLeft > 0 ? `${dateFormatter(timeLeft)} left` : "Overdue"}</p>
        <span className="divider" />
        <button onClick={() => markComplete(chore.id)}>
          <TiTickOutline />
        </button>
      </div>
    </div>
  );
};

export default IncompleteChoreComponent;