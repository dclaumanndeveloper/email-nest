import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { readNotifications } from './readNotifications';
import { users } from './users';

export const notifications = pgTable('notifications', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  isGlobal: boolean('is_global').default(true),
  action: text('action'),
  type: text('type'),
  userId: text('user_id').references(() => users.id),
  expireAt: timestamp('expire_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
  userId: one(users, {
    fields: [notifications.userId],
    references: [users.id],
  }),
  readNotifications: one(readNotifications, {
    fields: [notifications.id],
    references: [readNotifications.id],
  }),
}));
