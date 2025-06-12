import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const users = pgTable('users', {
  id: text('id').$defaultFn(createId).primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

const sessions = pgTable('sessions', {
  id: text('id').$defaultFn(createId).primaryKey(),
  token: text('token'),
  userId: text('user_id').references(() => users.id),
  expiresIn: timestamp('expires_in').notNull(),
});

const TaskStatus = pgEnum('task_status_enum', ['waiting', 'doing', 'done']);

const Tasks = pgTable('tasks', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: TaskStatus('status').notNull().default('waiting'),
  userId: text('user_id').references(() => users.id),
});
