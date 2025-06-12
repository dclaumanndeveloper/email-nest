"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaSignin = void 0;
const zod_1 = require("zod");
exports.UserSchemaSignin = zod_1.z.object({
    email: zod_1.z.string().min(4),
    password: zod_1.z.string(),
});
//# sourceMappingURL=userSignin.js.map