import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { tokenTypeEnum } from './enum';

export const tokens = pgTable('tokens', {
  id: text('id').$defaultFn(createId).primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  type: tokenTypeEnum('type').notNull(),
  token: text('token').notNull(),
  refreshToken: text('refresh_token'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  expiredAt: timestamp('expired_at'),
});

export const tokensRelations = relations(tokens, ({ one }) => ({
  user: one(users, {
    fields: [tokens.userId],
    references: [users.id],
  }),
}));
