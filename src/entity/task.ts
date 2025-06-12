import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  status: z.enum(['waiting', 'doing', 'done']).optional(),
  userId: z.string().nullable().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
