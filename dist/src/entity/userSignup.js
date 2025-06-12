"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaSignup = void 0;
const zod_1 = require("zod");
exports.UserSchemaSignup = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(4, { message: 'Username must be at least 4 characters long' }),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
//# sourceMappingURL=userSignup.js.map