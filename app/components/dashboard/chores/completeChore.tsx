import type { CompleteChore } from "~/types/chores";
import { dateFormatter } from "~/utils/date";

interface CompleteChoreProps {
  chore: CompleteChore;
  flagChore: (choreID: string) => Promise<void>;
}

const CompleteChoreComponent = ({ chore, flagChore }: CompleteChoreProps) => {
  const timeCompletedAgo = -(Date.now() - chore.completedDate.valueOf()) / 1000;

  return (
    <div className="chore-container">
      <p>{chore.name}</p>

      <p>{chore.user}</p>
      <p>{dateFormatter(timeCompletedAgo)} ago</p>
      <button onClick={() => flagChore(chore.id)}>Flag</button>
    </div>
  );
};

export default CompleteChoreComponent;
