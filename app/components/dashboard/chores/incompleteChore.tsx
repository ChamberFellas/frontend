import type { IncompleteChore } from "~/types/chores";

interface IncompleteChoreProps {
  chore: IncompleteChore;
  markComplete: (choreID: string) => Promise<void>;
}

const IncompleteChoreComponent = ({
  chore,
  markComplete,
}: IncompleteChoreProps) => {
  const time_left = (chore.dueDate.valueOf() - Date.now()) / 1000;

  return (
    <div>
      <p>{chore.name}</p>

      <p>{chore.user}</p>
      <p>
        {time_left > 0 ? `${Math.floor(time_left)} seconds left` : "Overdue"}
      </p>

      <button onClick={() => markComplete(chore.id)}>Complete</button>
    </div>
  );
};

export default IncompleteChoreComponent;
