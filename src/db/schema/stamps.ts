import { createId } from '@paralleldrive/cuid2';
import { pgTable, text } from 'drizzle-orm/pg-core';

import { relations } from 'drizzle-orm';
import { organizations } from './organizations';
import { releases } from './releases';

export const stamps = pgTable('stamps', {
  id: text('id').$defaultFn(createId).primaryKey(),
  name: text('name').notNull(),
  orgId: text('org_id')
    .notNull()
    .references(() => organizations.id),
});
export const stampsRelations = relations(stamps, ({ many, one }) => ({
  organizations: one(organizations, {
    fields: [stamps.orgId],
    references: [organizations.id],
  }),
  releases: many(releases),
}));
