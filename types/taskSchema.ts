import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  deadline: z.string(), // Adiciona a validação para deadline
});

export type TaskFormValues = z.infer<typeof taskSchema>;
