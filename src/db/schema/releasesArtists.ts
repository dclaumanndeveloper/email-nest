import { createId } from '@paralleldrive/cuid2';
import { boolean, index, pgTable, text } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { artists } from './artists';
import { releases } from './releases';

export const releasesArtists = pgTable(
  'releases_artists',
  {
    id: text('id').$defaultFn(createId).primaryKey(),
    featuring: boolean('featuring').default(false),
    artistId: text('artist_id')
      .notNull()
      .references(() => artists.id),
    releaseId: text('release_id')
      .notNull()
      .references(() => releases.id),
  },
  (table) => [index('release_artists_id_idx').on(table.releaseId)],
);

export const releasesArtistsRelations = relations(
  releasesArtists,
  ({ many, one }) => ({
    release: one(releases, {
      fields: [releasesArtists.releaseId],
      references: [releases.id],
    }),
    artists: many(artists),
  }),
);
