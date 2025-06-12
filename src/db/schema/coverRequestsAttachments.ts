import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { coversRequests } from './coverRequests';
import { imageTypeEnum } from './enum';

export const coverRequestsAttachments = pgTable('cover_requests_attachments', {
  id: text('id').$defaultFn(createId).primaryKey(),
  title: text('title'),
  coverRequestId: text('cover_request_id')
    .notNull()
    .references(() => coversRequests.id),
  imageType: imageTypeEnum('image_type').notNull(),
});

export const coverRequestsAttachmentsRelations = relations(
  coverRequestsAttachments,
  ({ one }) => ({
    coverRequests: one(coversRequests, {
      fields: [coverRequestsAttachments.coverRequestId],
      references: [coversRequests.id],
    }),
  }),
);
