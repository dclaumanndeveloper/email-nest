import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { releases } from './releases';
import { users } from './users';
import { contractStatusEnum, contractTypeEnum } from './enum';

export const contracts = pgTable('contracts', {
  id: text('id').$defaultFn(createId).primaryKey(),
  agreements: text('agreements').notNull(),
  releaseId: text('release_id').references(() => releases.id),
  userId: text('user_id').references(() => users.id),
  active: boolean('active').default(true).notNull(),
  type: contractTypeEnum('token_type').default('exclusive'),
  statusContract: contractStatusEnum('status').default('Pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const contractsRelations = relations(contracts, ({ one }) => ({
  user: one(users, {
    fields: [contracts.userId],
    references: [users.id],
  }),
  releases: one(releases, {
    fields: [contracts.releaseId],
    references: [releases.id],
  }),
}));
