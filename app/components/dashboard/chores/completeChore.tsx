import type { CompleteChore } from "~/types/chores";

interface CompleteChoreProps {
  chore: CompleteChore;
  flagChore: (choreID: string) => Promise<void>;
}

const CompleteChoreComponent = ({ chore, flagChore }: CompleteChoreProps) => {
  return (
    <div>
      <p>{chore.name}</p>

      <p>{chore.user}</p>
      <p>{chore.completedDate.toString()}</p>
      <button onClick={() => flagChore(chore.id)}>Flag</button>
    </div>
  );
};

export default CompleteChoreComponent;
