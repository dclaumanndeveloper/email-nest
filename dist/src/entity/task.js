"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = void 0;
const zod_1 = require("zod");
exports.TaskSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    status: zod_1.z.enum(['waiting', 'doing', 'done']).optional(),
    userId: zod_1.z.string().nullable().optional(),
});
//# sourceMappingURL=task.js.map