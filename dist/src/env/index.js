"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['dev', 'test', 'prod']),
    PORT: zod_1.z.coerce.number(),
    AUTH_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    JWT_SECRET: zod_1.z.string(),
    RESEND_API_KEY: zod_1.z.string().optional(),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error('Invalid environment variables:');
    console.log(JSON.stringify(_env.error.flatten().fieldErrors, null, 2));
    process.exit(1);
}
exports.env = _env.data;
//# sourceMappingURL=index.js.map