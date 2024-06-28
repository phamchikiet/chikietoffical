"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const postgres_1 = require("@vercel/postgres");
const vercel_postgres_1 = require("drizzle-orm/vercel-postgres");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env.local' });
exports.db = (0, vercel_postgres_1.drizzle)(postgres_1.sql);
//# sourceMappingURL=index.js.map