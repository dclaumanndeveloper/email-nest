import { createId } from '@paralleldrive/cuid2';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { artistsBiographys } from './artistsBiographys';
import { artistMembers } from './artistsMembers';
import { organizations } from './organizations';
import { releasesArtists } from './releasesArtists';

export const artists = pgTable('artists', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  needCreatePlatforms: boolean('need_create_platforms')
    .notNull()
    .default(false),
  spotifyLink: text('spotify_link').array().notNull(),
  appleLink: text('apple_link').array(),
  deezerLink: text('deezer_link').array(),
  youtubeLink: text('youtube_link').array(),
  facebookLink: text('facebook_link').array(),
  tiktokLink: text('tiktok_link').array(),
  instagramLink: text('instagram_link').array(),
  organizationId: text('org_id')
    .notNull()
    .references(() => organizations.id),
  othersLink: text('others_link').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const artistsRelations = relations(artists, ({ many, one }) => ({
  organizations: one(organizations, {
    fields: [artists.organizationId],
    references: [organizations.id],
  }),
  releasesArtists: one(releasesArtists, {
    fields: [artists.id],
    references: [releasesArtists.artistId],
  }),
  artistsBiographys: many(artistsBiographys),
  members: many(artistMembers),
}));
