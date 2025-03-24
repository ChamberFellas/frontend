import type { Bill } from "./types/bills";
import type { CompleteChore, IncompleteChore } from "./types/chores";

const incomplete_chores: IncompleteChore[] = [
  {
    id: "1",
    name: "Clean kitchen",
    description: "Thorougly clean the kitchen",
    dueDate: new Date("2025-03-30"),
  },
  {
    id: "2",
    name: "Wash dishes",
    description: "Wash all the dishes",
    dueDate: new Date("2025-03-31"),
  },
];

const complete_chores: CompleteChore[] = [
  {
    id: "3",
    name: "Clean bathroom",
    description: "Thorougly clean the bathroom",
    user: "Bob",
    completedDate: new Date("2025-03-30"),
    flagged: false,
  },
  {
    id: "4",
    name: "Vacuum living room",
    description: "Vacuum the living room",
    user: "Alice",
    completedDate: new Date("2025-03-31"),
    flagged: true,
  },
];

const bills: Bill[] = [
  {
    id: "1",
    name: "Rent",
    amount: 100,
    dueDate: new Date("2025-03-30"),
    paid: true,
  },
  {
    id: "2",
    name: "Utilities",
    amount: 200,
    dueDate: new Date("2025-04-02"),
    paid: false,
  },
];

export const mockdata = {
  incomplete_chores,
  complete_chores,
  bills,
};
