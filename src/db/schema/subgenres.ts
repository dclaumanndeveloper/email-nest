import { createId } from '@paralleldrive/cuid2';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { genres } from './genres';

export const subgenres = pgTable('subgenres', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  isActive: boolean('is_active').default(true),
  genreId: text('genre_id')
    .notNull()
    .references(() => genres.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const subGenresRelations = relations(subgenres, ({ one }) => ({
  genres: one(genres, {
    fields: [subgenres.genreId],
    references: [genres.id],
  }),
}));
