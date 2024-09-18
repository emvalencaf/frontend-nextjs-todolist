// types/task.ts
export interface TaskType {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  deadline?: string; // Adiciona o campo deadline
}

// types/taskSchema.ts
import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  deadline: z.string(), // Adiciona a validação para deadline
});

export type TaskFormValues = z.infer<typeof taskSchema>;
