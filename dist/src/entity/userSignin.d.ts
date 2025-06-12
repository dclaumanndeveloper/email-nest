import { z } from 'zod';
export declare const UserSchemaSignin: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export type UserSignin = z.infer<typeof UserSchemaSignin>;
