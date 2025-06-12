"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
require("dotenv/config");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const schema = require("./schema");
exports.db = (0, node_postgres_1.drizzle)(process.env.DATABASE_URL, { schema });
//# sourceMappingURL=index.js.map