import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';
import { inviteStatusEnum } from './enum';

export const invites = pgTable('invites', {
  id: text('id').$defaultFn(createId).primaryKey(),
  whoInviteId: text('who_invite_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  guestId: text('guest_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organizations.id),
  inviteStatus: inviteStatusEnum('invite_status').notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const invitesRelations = relations(invites, ({ one }) => ({
  inviter: one(users, {
    fields: [invites.whoInviteId],
    references: [users.id],
  }),
  guest: one(users, {
    fields: [invites.guestId],
    references: [users.id],
  }),
  organization: one(organizations, {
    fields: [invites.organizationId],
    references: [organizations.id],
  }),
}));
