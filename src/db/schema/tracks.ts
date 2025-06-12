import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
} from 'drizzle-orm/pg-core';
import { releases } from './releases';
import { isExplicitEnum, trackTypeEnum, versionEnum } from './enum';
import { tracksCopyrights } from './tracksCopyrights';
import { tracksMembers } from './tracksMembers';

export const tracks = pgTable(
  'tracks',
  {
    id: text('id').$defaultFn(createId).primaryKey(),
    releaseId: text('release_id')
      .notNull()
      .references(() => releases.id),
    title: text('title').notNull(),
    subtitle: text('subtitle'),
    titleLanguage: text('title_language'),
    contentType: text('content_type'),
    trackType: trackTypeEnum('track_type').notNull(),
    version: versionEnum('version').notNull(),
    isInstrumental: boolean('is_instrumental').default(false),
    AcceptTermIsrc: boolean('accept_term_isrc'),
    isEditTrack: boolean('is_edit_track').default(false),
    isrcCode: text('isrc_code'),
    iswcCode: text('iswc_code'),
    previewTime: time('preview_time'),
    genre: text('genre'),
    subGenre: text('sub_genre'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at')
      .defaultNow()
      .$onUpdateFn(() => new Date()),
    deletedAt: timestamp('deleted_at'),
    trackFile: text('track_file'),
    lyrics: text('lyrics'),
    isExplicit: isExplicitEnum('is_explicit').default('Não'),
    lyricsLanguage: text('lyrics_language'),
    isAbramus: boolean('is_abramus').default(false),
    isBackoffice: boolean('is_backoffice').default(false),
    isInternational: boolean('is_international').default(false),
    isCompleted: boolean('is_completed').default(false),
  },
  (table) => [
    index('title_track_idx').on(table.title),
    index('version_track_idx').on(table.version),
    index('release_track_id_idx').on(table.releaseId),
    index('is_active_idx').on(table.isActive),
  ],
);

export const tracksRelations = relations(tracks, ({ one, many }) => ({
  releases: one(releases, {
    fields: [tracks.releaseId],
    references: [releases.id],
  }),
  tracksMembers: many(tracksMembers),
  tracksCopyrights: many(tracksCopyrights),
}));
