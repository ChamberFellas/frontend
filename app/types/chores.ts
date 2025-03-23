export interface IncompleteChore {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  user: string;
}

export interface CompleteChore {
  id: string;
  name: string;
  description: string;
  completedDate: Date;
  flagged: boolean;
  user: string;
}
