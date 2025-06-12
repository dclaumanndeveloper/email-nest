import { createId } from '@paralleldrive/cuid2';
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { changesRequests } from './changeRequests';
import { coversRequests } from './coverRequests';
import { organizations } from './organizations';
import { pitchs } from './pitchs';
import { releasesArtists } from './releasesArtists';
import { stamps } from './stamps';
import { tracks } from './tracks';
import { users } from './users';
import {
  contentTypeEnum,
  releaseFormatEnum,
  releaseStatusEnum,
  versionEnum,
} from './enum';

export const releases = pgTable(
  'releases',
  {
    id: text('id').$defaultFn(createId).primaryKey(),
    title: text('title').notNull(),
    subtitle: text('subtitle'),
    orgId: text('org_id')
      .notNull()
      .references(() => organizations.id),
    contentType: contentTypeEnum('content_type').notNull(),
    status: releaseStatusEnum('status').notNull().default('pending'),
    format: releaseFormatEnum('format').notNull(),
    catalogNumber: text('catalog_number'),
    isNewMusicCatalog: boolean('is_new_music_catalog').default(false),
    languageTitle: text('language_title').notNull(),
    genre: text('genre').notNull(),
    subGenre: text('sub_genre').notNull(),
    version: versionEnum('version').notNull(),
    releaseDate: timestamp('release_date').notNull(),
    releaseOriginalDate: timestamp('release_original_date'),
    recordYear: text('record_year').notNull(),
    releaseYear: text('release_year').notNull(),
    stampId: text('stamp_id')
      .notNull()
      .references(() => stamps.id),
    pLine: text('p_line').notNull(),
    cLine: text('c_line').notNull(),
    upcEan: text('upc_ean'),
    isMetaTiktokRelease: boolean('is_meta_tiktok_release').default(false),
    metaTiktokReleaseDate: timestamp('meta_tiktok_release_date'),
    linkCover: text('link_cover').notNull(),
    assignementTo: text('user_id').references(() => users.id),
    hourRelease: text('hour_release'),
  },
  (table) => [
    index('title_idx').on(table.title),
    index('version_idx').on(table.version),
    index('release_date_idx').on(table.releaseDate),
    index('status_idx').on(table.status),
    index('org_id_idx').on(table.orgId),
  ],
);

export const releasesRelations = relations(releases, ({ many, one }) => ({
  organizations: one(organizations, {
    fields: [releases.orgId],
    references: [organizations.id],
  }),
  assignementTo: one(users, {
    fields: [releases.assignementTo],
    references: [users.id],
  }),
  stamps: one(stamps, {
    fields: [releases.stampId],
    references: [stamps.id],
  }),
  releasesArtists: many(releasesArtists),
  pitchs: many(pitchs),
  coversRequests: many(coversRequests),
  changesRequests: many(changesRequests),
  tracks: many(tracks),
}));
