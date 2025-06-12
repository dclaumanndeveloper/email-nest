import { createId } from '@paralleldrive/cuid2';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { releases } from './releases';

export const pitchs = pgTable('pitchs', {
  id: text('id').$defaultFn(createId).primaryKey(),
  isPitch: boolean('is_pitch').default(false),
  releaseId: text('release_id')
    .notNull()
    .references(() => releases.id),
  file: text('file'),
  content: text('content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  isSong: boolean('is_song').default(false),
});

export const pitchsRelations = relations(pitchs, ({ one }) => ({
  releases: one(releases, {
    fields: [pitchs.releaseId],
    references: [releases.id],
  }),
}));
