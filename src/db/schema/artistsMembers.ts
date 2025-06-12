import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { artists } from './artists';
import { persons } from './persons';

export const artistMembers = pgTable('artists_members', {
  id: text('id').$defaultFn(createId).primaryKey(),
  personId: text('person_id')
    .notNull()
    .references(() => persons.id),
  artistId: text('artist_id')
    .notNull()
    .references(() => artists.id),
});

export const artistsMembersRelations = relations(artistMembers, ({ one }) => ({
  artist: one(artists, {
    fields: [artistMembers.artistId],
    references: [artists.id],
  }),
  members: one(persons, {
    fields: [artistMembers.personId],
    references: [persons.id],
  }),
}));
