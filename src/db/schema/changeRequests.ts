import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { changesRequestsAttachments } from './changeRequestsAttachments';
import { releases } from './releases';

export const statusChangeRequestEnum = pgEnum('status_change_request', [
  'Pending',
  'Concluded',
]);

export const changesRequests = pgTable('changes_requests', {
  id: text('id').$defaultFn(createId).primaryKey(),
  releaseId: text('release_id')
    .notNull()
    .references(() => releases.id),
  subject: text('subject').notNull(),
  details: text('details').notNull(),
  status: statusChangeRequestEnum('status').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export const changesRequestsRelations = relations(
  changesRequests,
  ({ one, many }) => ({
    releases: one(releases, {
      fields: [changesRequests.releaseId],
      references: [releases.id],
    }),
    changesRequestsAttachments: many(changesRequestsAttachments),
  }),
);
