import { CiFlag1 } from "react-icons/ci";
import { FaFlag } from "react-icons/fa";
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

      <div className="added-details-container">
        <p>{chore.user}</p>
        <p> - {dateFormatter(timeCompletedAgo)} ago</p>
        <span className="divider" />
        <button onClick={() => flagChore(chore.id)}>
          {chore.flagged ? <CiFlag1 /> : <FaFlag />}
        </button>
      </div>
    </div>
  );
};

export default CompleteChoreComponent;
