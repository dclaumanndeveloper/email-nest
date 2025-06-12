import { createId } from '@paralleldrive/cuid2';
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
export * from './schema/tracks';
export * from './schema/banks';
export * from './schema/contracts';
export * from './schema/artists';
export * from './schema/artistsBiographys';
export * from './schema/artistsMembers';
export * from './schema/genres';
export * from './schema/invites';
export * from './schema/musicalInstruments';
export * from './schema/persons';
export * from './schema/notifications';
export * from './schema/organizations';
export * from './schema/organizationsMembers';
export * from './schema/readNotifications';
export * from './schema/stamps';
export * from './schema/subgenres';
export * from './schema/tokens';
export * from './schema/licensors';
export * from './schema/tracksCopyrights';
export * from './schema/tracksMembers';
export * from './schema/users';

export * from './schema/changeRequests';
export * from './schema/changeRequestsAttachments';
export * from './schema/coverRequests';
export * from './schema/coverRequestsAttachments';
export * from './schema/pitchs';
export * from './schema/releases';
export * from './schema/releasesArtists';

export const users = pgTable('users', {
  id: text('id').$defaultFn(createId).primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

export const sessions = pgTable('sessions', {
  id: text('id').$defaultFn(createId).primaryKey(),
  refreshToken: text('refresh_token'),
  token: text('token'),
  userId: text('user_id').references(() => users.id),
  expiresIn: timestamp('expires_in').notNull(),
});

export const TaskStatus = pgEnum('task_status_enum', [
  'waiting',
  'doing',
  'done',
]);

export const tasks = pgTable('tasks', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: TaskStatus('status').notNull().default('waiting'),
  userId: text('user_id').references(() => users.id),
});
