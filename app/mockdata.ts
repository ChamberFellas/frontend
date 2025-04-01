import type { Bill } from "./types/bills";
import type { CompleteChore, IncompleteChore } from "./types/chores";

const incomplete_chores: IncompleteChore[] = [
  {
    id: "1",
    name: "Clean kitchen",
    description: "Thorougly clean the kitchen",
    dueDate: new Date("2025-04-03"),
  },
  {
    id: "2",
    name: "Wash dishes",
    description: "Wash all the dishes",
    dueDate: new Date("2025-04-05"),
  },
];

const complete_chores: CompleteChore[] = [
  {
    id: "3",
    name: "Clean bathroom",
    description: "Thorougly clean the bathroom",
    user: "Bob",
    completedDate: new Date("2025-02-30"), 
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
    amount: 500,
    dueDate: new Date("2025-03-30"),
    paid: true,
    recipient: "Charlie",
  },
  {
    id: "2",
    name: "Water",
    amount: 20,
    dueDate: new Date("2025-04-10"),
    paid: false,
    recipient: "Jane",
  },
  {
    id: "3",
    name: "Milk",
    amount: 2,
    dueDate: new Date("2025-03-30"),
    paid: false,
    recipient: "Me",
  },
  {
    id: "4",
    name: "Electricity",
    amount: 200,
    dueDate: new Date("2025-04-10"),
    paid: true,
    recipient: "Me",
  }
  
];

export const mockdata = {
  incomplete_chores,
  complete_chores,
  bills,
};
