import { CiFlag1 } from "react-icons/ci";
import { FaFlag } from "react-icons/fa";
import type { CompleteChore } from "~/types/chores";
import { dateFormatter } from "~/utils/date";

interface CompleteChoreProps {
  chore: CompleteChore;
  flagChore: (choreID: string, flagged: boolean) => Promise<void>; // Updated to include the new flagged state
}

const CompleteChoreComponent = ({ chore, flagChore }: CompleteChoreProps) => {
  const timeCompletedAgo = -(Date.now() - chore.completedDate.valueOf()) / 1000;

  const handleFlagToggle = async () => {
    await flagChore(chore.id, !chore.flagged); // Toggle the flagged state
  };

  return (
    <div className="chore-container">
      <p>{chore.name}</p>

      <div className="added-details-container">
        <p>{chore.user}</p>
        <p> - {dateFormatter(timeCompletedAgo)} ago</p>
        <span className="divider" />
        <button onClick={handleFlagToggle}>
          {chore.flagged ? <CiFlag1 /> : <FaFlag />}
        </button>
      </div>
    </div>
  );
};

export default CompleteChoreComponent;