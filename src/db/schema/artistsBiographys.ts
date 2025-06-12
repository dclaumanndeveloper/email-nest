import { createId } from '@paralleldrive/cuid2';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { artists } from './artists';
import { biographyTypeEnum, fileTypeEnum } from './enum';

export const artistsBiographys = pgTable('artists_biographys', {
  id: text('id').$defaultFn(createId).primaryKey(),
  type: biographyTypeEnum('type').notNull(),
  content: text('content'),
  file: text('file'),
  artistId: text('artist_id')
    .notNull()
    .references(() => artists.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  fileType: fileTypeEnum('file_type').notNull(),
});

export const artistsBiographysRelations = relations(
  artistsBiographys,
  ({ one }) => ({
    artist: one(artists, {
      fields: [artistsBiographys.artistId],
      references: [artists.id],
    }),
  }),
);
