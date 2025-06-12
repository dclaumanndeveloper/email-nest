import { Strategy } from 'passport-jwt';
import { z } from 'zod';
declare const tokenPayloadSchema: z.ZodObject<{
    sub: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
    email?: string | undefined;
    sub?: string | undefined;
    username?: string | undefined;
}, {
    token: string;
    email?: string | undefined;
    sub?: string | undefined;
    username?: string | undefined;
}>;
export type UserPayload = z.infer<typeof tokenPayloadSchema>;
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserPayload): Promise<{
        userId: string | undefined;
        username: string | undefined;
    }>;
}
export {};
