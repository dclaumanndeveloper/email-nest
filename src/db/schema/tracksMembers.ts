import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { artists } from './artists';
import { persons } from './persons';
import { tracks } from './tracks';

export const tracksMembers = pgTable('tracks_members', {
  id: text('id').$defaultFn(createId).primaryKey(),
  isFeaturing: boolean('isFeaturing').default(false),
  artistId: text('artist_id').references(() => artists.id),
  tracksId: text('tracks_id')
    .notNull()
    .references(() => tracks.id),
  personId: text('person_id').references(() => persons.id),
  percentage: text('percentage'),
  assignment: text('assignment'),
  instruments: text('instruments').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const tracksMembersRelations = relations(tracksMembers, ({ one }) => ({
  artists: one(artists, {
    fields: [tracksMembers.personId],
    references: [artists.id],
  }),
  persons: one(persons, {
    fields: [tracksMembers.personId],
    references: [persons.id],
  }),
  tracks: one(tracks, {
    fields: [tracksMembers.tracksId],
    references: [tracks.id],
  }),
}));
