import { z } from 'zod';

export const UserSchemaSignup = z.object({
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long' }),
  email: z.string().email(),
  password: z.string().min(8),
});

export type UserSignup = z.infer<typeof UserSchemaSignup>;
