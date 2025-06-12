import { z } from 'zod';
export declare const UserSchemaSignup: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
    username: string;
}, {
    password: string;
    email: string;
    username: string;
}>;
export type UserSignup = z.infer<typeof UserSchemaSignup>;
