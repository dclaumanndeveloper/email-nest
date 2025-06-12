import { createId } from '@paralleldrive/cuid2';
import { pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { users } from './users';
import {
  socialTypeEnum,
  personTypeEnum,
  songwriterContractTypeEnum,
  songwriterIsNewMusicEnum,
} from './enum';

export const persons = pgTable('persons', {
  id: text('id').$defaultFn(createId).primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  fullName: text('full_name'),
  position: text('position'),
  pseudonym: text('pseudonym'),
  corporateName: text('corporate_name'),
  tradeName: text('trade_name'),
  socialType: socialTypeEnum('social_type'),
  socialNumber: text('document_number').notNull(),
  email: text('email'),
  rg: text('rg'),
  maritalStatus: text('marital_status'),
  personType: personTypeEnum('person_type').notNull(),
  birthday: timestamp('birthday'),
  organizationId: text('org_id')
    .references(() => organizations.id, { onDelete: 'cascade' })
    .notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
  deletedAt: timestamp('deleted_at'),
  songwriterContractType: songwriterContractTypeEnum(
    'songwriter_contract_type',
  ),
  songwriterNewMusic: songwriterIsNewMusicEnum('songwriter_new_music')
    .notNull()
    .default('No'),
});

export const personsRelations = relations(persons, ({ one, many }) => ({
  user: one(users, {
    fields: [persons.userId],
    references: [users.id],
  }),
}));
