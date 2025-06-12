import { z } from 'zod';

export const UserSchemaSignin = z.object({
  email: z.string().min(4),
  password: z.string(),
});

export type UserSignin = z.infer<typeof UserSchemaSignin>;
