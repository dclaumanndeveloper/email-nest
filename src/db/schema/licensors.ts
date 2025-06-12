import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { contracts } from './contracts';

export const licensors = pgTable('licensors', {
  id: text('id').$defaultFn(createId).primaryKey(),
  licensorPseudonym: text('licensor_pseudonym'),
  contractId: text('contract_id').references(() => contracts.id),
  licensorName: text('licensor_name'),
  licensorPhone: text('licensor_phone'),
  licensorEmail: text('licensor_email'),
  licensorMaritalStatus: text('licensor_marital_status'),
  licensorBirthday: text('licensor_birthday'),
  licensorCpf: text('licensor_cpf'),
  licensorRg: text('licensor_rg'),
  licensorZipCode: text('licensor_zip_code'),
  licensorAddress: text('licensor_address'),
  licensorNumber: text('licensor_number'),
  licensorComplement: text('licensor_complement'),
  licensorNeighborhood: text('licensor_neighborhood'),
  licensorCity: text('licensor_city'),
  licensorState: text('licensor_state'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

export const licensorsRelations = relations(licensors, ({ one }) => ({
  contract: one(contracts, {
    fields: [licensors.contractId],
    references: [contracts.id],
  }),
}));
