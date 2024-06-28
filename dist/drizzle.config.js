"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const drizzle_kit_1 = require("drizzle-kit");
(0, dotenv_1.config)({ path: '.env.local' });
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: './src/db/schema.ts',
    out: './migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: "postgres://default:QKsghOH17GBE@ep-crimson-haze-a10m0yu9.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
    },
});
//# sourceMappingURL=drizzle.config.js.map