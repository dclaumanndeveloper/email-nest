import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { notifications } from './notifications';
import { users } from './users';

export const readNotifications = pgTable('read_notifications', {
  id: text('id').$defaultFn(createId).primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  notificationId: text('notification_id')
    .notNull()
    .references(() => notifications.id, { onDelete: 'cascade' }),
  readAt: timestamp('read_at'),
});

export const readNotificationsRelations = relations(
  readNotifications,
  ({ one }) => ({
    notifications: one(notifications, {
      fields: [readNotifications.notificationId],
      references: [notifications.id],
    }),
    users: one(users, {
      fields: [readNotifications.userId],
      references: [users.id],
    }),
  }),
);
