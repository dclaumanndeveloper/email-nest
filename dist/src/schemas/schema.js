"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
const users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    username: (0, pg_core_1.text)('username').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    passwordHash: (0, pg_core_1.text)('password_hash').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
});
const sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    token: (0, pg_core_1.text)('token'),
    userId: (0, pg_core_1.text)('user_id').references(() => users.id),
    expiresIn: (0, pg_core_1.timestamp)('expires_in').notNull(),
});
const TaskStatus = (0, pg_core_1.pgEnum)('task_status_enum', ['waiting', 'doing', 'done']);
const Tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    status: TaskStatus('status').notNull().default('waiting'),
    userId: (0, pg_core_1.text)('user_id').references(() => users.id),
});
//# sourceMappingURL=schema.js.map