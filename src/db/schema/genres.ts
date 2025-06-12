import { createId } from '@paralleldrive/cuid2';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { subgenres } from './subgenres';

export const genres = pgTable('genres', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const genresRelations = relations(genres, ({ many }) => ({
  subgenres: many(subgenres),
}));
