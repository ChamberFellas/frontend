export interface IncompleteChore {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
}


export interface CompleteChore {
  id: string;
  name: string;
  description: string;
  completedDate: Date;
  flagged: boolean;
  user: string; // Ensure this property is always present
}