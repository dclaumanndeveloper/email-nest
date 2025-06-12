import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { coverRequestsAttachments } from './coverRequestsAttachments';
import { releases } from './releases';

export const coversRequests = pgTable('covers_requests', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title'),
  releaseId: text('release_id')
    .notNull()
    .references(() => releases.id),
  briefing: text('briefing'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at'),
});

export const coversRequestsRelations = relations(
  coversRequests,
  ({ one, many }) => ({
    releases: one(releases, {
      fields: [coversRequests.releaseId],
      references: [releases.id],
    }),
    coverRequestsAttachments: many(coverRequestsAttachments),
  }),
);
