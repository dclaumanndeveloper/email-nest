import { createId } from '@paralleldrive/cuid2';
import { relations } from 'drizzle-orm';
import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { changesRequests } from './changeRequests';
import { fileMusicTypeEnum } from './enum';

export const changesRequestsAttachments = pgTable(
  'changes_requests_attachments',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey(),
    changeRequestId: text('change_request_id')
      .notNull()
      .references(() => changesRequests.id),
    fileType: fileMusicTypeEnum('file_music_type').notNull(),
    downloadLink: text('download_link').notNull(),
  },
);

export const changesRequestsAttachmentsRelations = relations(
  changesRequestsAttachments,
  ({ one }) => ({
    changesRequests: one(changesRequests, {
      fields: [changesRequestsAttachments.changeRequestId],
      references: [changesRequests.id],
    }),
  }),
);
