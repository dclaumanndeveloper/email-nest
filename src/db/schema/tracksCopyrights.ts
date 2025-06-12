import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { index, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { tracks } from './tracks';

export const tracksCopyrights = pgTable(
  'tracks_copyrights',
  {
    id: text('id').$defaultFn(createId).primaryKey(),
    tracksId: text('tracks_id')
      .notNull()
      .references(() => tracks.id),
    fileLink: text('file_link').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    index('id_track_idx').on(table.id),
    index('track_id_copyrights_idx').on(table.tracksId),
  ],
);

export const tracksCopyrightsRelations = relations(
  tracksCopyrights,
  ({ one }) => ({
    tracks: one(tracks, {
      fields: [tracksCopyrights.tracksId],
      references: [tracks.id],
    }),
  }),
);
