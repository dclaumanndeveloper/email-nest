import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { bankStatusEnum, pixStatusEnum } from './enum';

export const banks = pgTable('banks', {
  id: text('id').$defaultFn(createId).primaryKey(),
  socialNumber: text('social_number').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  isFavorite: boolean('is_favorite').default(true),
  agency: text('agency'),
  bankCode: text('bank_code'),
  bankName: text('bank_name'),
  account: text('account'),
  accountType: text('account_type'),
  holder: text('holder').notNull(),
  pixType: text('pix_type'),
  pixStatus: pixStatusEnum('pix_status').notNull(),
  bankStatus: bankStatusEnum('bank_status').notNull(),
  pix: text('pix'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
export const banksRelations = relations(banks, ({ one }) => ({
  user: one(users, {
    fields: [banks.userId],
    references: [users.id],
  }),
}));
