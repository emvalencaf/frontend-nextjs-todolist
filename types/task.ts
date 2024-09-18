// types/task.ts
export interface TaskType {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    createdAt: string; // ISO 8601 string
    updatedAt: string; // ISO 8601 string
    deadline: string; // ISO 8601 string
  }
  