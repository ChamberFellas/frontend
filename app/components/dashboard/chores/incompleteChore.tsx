import type { IncompleteChore } from "~/types/chores";
import { dateFormatter } from "~/utils/date";

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

      <p>{chore.user}</p>
      <p>{time_left > 0 ? `${dateFormatter(time_left)} left` : "Overdue"}</p>

      <button onClick={() => markComplete(chore.id)}>Complete</button>
    </div>
  );
};

export default IncompleteChoreComponent;
