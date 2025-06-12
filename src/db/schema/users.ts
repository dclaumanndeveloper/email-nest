import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { persons } from './persons';
import { tokens } from './tokens';
import { roleEnum, userStatusEnum } from './enum';

export const users = pgTable('users', {
  id: text('id').$defaultFn(createId).primaryKey(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  avatar: text('avatar').default(
    'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
  ),
  termsAndPrivacy: boolean('terms_and_privacy').notNull().default(false),
  requestService: boolean('request_service').notNull().default(false),
  newsletter: boolean('newsletter').default(false),
  userStatus: userStatusEnum('user_status').notNull().default('waiting'),
  role: roleEnum('role').notNull().default('user'),
});

export const usersRelations = relations(users, ({ one }) => ({
  person: one(persons, {
    fields: [users.id],
    references: [persons.userId],
  }),
  token: one(tokens, {
    fields: [users.id],
    references: [tokens.userId],
  }),
}));
