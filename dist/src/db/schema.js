"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasks = exports.TaskStatus = exports.sessions = exports.users = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const pg_core_1 = require("drizzle-orm/pg-core");
__exportStar(require("./schema/tracks"), exports);
__exportStar(require("./schema/banks"), exports);
__exportStar(require("./schema/contracts"), exports);
__exportStar(require("./schema/artists"), exports);
__exportStar(require("./schema/artistsBiographys"), exports);
__exportStar(require("./schema/artistsMembers"), exports);
__exportStar(require("./schema/genres"), exports);
__exportStar(require("./schema/invites"), exports);
__exportStar(require("./schema/musicalInstruments"), exports);
__exportStar(require("./schema/persons"), exports);
__exportStar(require("./schema/notifications"), exports);
__exportStar(require("./schema/organizations"), exports);
__exportStar(require("./schema/organizationsMembers"), exports);
__exportStar(require("./schema/readNotifications"), exports);
__exportStar(require("./schema/stamps"), exports);
__exportStar(require("./schema/subgenres"), exports);
__exportStar(require("./schema/tokens"), exports);
__exportStar(require("./schema/licensors"), exports);
__exportStar(require("./schema/tracksCopyrights"), exports);
__exportStar(require("./schema/tracksMembers"), exports);
__exportStar(require("./schema/users"), exports);
__exportStar(require("./schema/changeRequests"), exports);
__exportStar(require("./schema/changeRequestsAttachments"), exports);
__exportStar(require("./schema/coverRequests"), exports);
__exportStar(require("./schema/coverRequestsAttachments"), exports);
__exportStar(require("./schema/pitchs"), exports);
__exportStar(require("./schema/releases"), exports);
__exportStar(require("./schema/releasesArtists"), exports);
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    username: (0, pg_core_1.text)('username').notNull(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    passwordHash: (0, pg_core_1.text)('password_hash').notNull(),
    isActive: (0, pg_core_1.boolean)('is_active').notNull().default(true),
});
exports.sessions = (0, pg_core_1.pgTable)('sessions', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    refreshToken: (0, pg_core_1.text)('refresh_token'),
    token: (0, pg_core_1.text)('token'),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id),
    expiresIn: (0, pg_core_1.timestamp)('expires_in').notNull(),
});
exports.TaskStatus = (0, pg_core_1.pgEnum)('task_status_enum', [
    'waiting',
    'doing',
    'done',
]);
exports.tasks = (0, pg_core_1.pgTable)('tasks', {
    id: (0, pg_core_1.text)('id').$defaultFn(cuid2_1.createId).primaryKey(),
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    status: (0, exports.TaskStatus)('status').notNull().default('waiting'),
    userId: (0, pg_core_1.text)('user_id').references(() => exports.users.id),
});
//# sourceMappingURL=schema.js.map