import { z } from 'zod';
export declare const TaskSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["waiting", "doing", "done"]>>;
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    id?: string | undefined;
    userId?: string | null | undefined;
    status?: "waiting" | "doing" | "done" | undefined;
}, {
    title: string;
    description: string;
    id?: string | undefined;
    userId?: string | null | undefined;
    status?: "waiting" | "doing" | "done" | undefined;
}>;
export type Task = z.infer<typeof TaskSchema>;
