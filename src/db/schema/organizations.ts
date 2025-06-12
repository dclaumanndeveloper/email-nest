import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { organizationsMembers } from './organizationsMembers';
import { users } from './users';

export const organizations = pgTable('organizations', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
});

export const organizationsRelations = relations(organizations, ({ many }) => ({
  members: many(organizationsMembers),
}));
