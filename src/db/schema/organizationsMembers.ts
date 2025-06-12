import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { users } from './users';
import { roleEnum } from './enum';

export const organizationsMembers = pgTable('organizations_members', {
  id: text('id').$defaultFn(createId).primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull().default('user'),
});

export const organizationsMembersRelations = relations(
  organizationsMembers,
  ({ one }) => ({
    organizations: one(organizations, {
      fields: [organizationsMembers.organizationId],
      references: [organizations.id],
    }),
    users: one(users, {
      fields: [organizationsMembers.userId],
      references: [users.id],
    }),
  }),
);
