import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env.local' });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: "postgres://default:QKsghOH17GBE@ep-crimson-haze-a10m0yu9.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require",
  },
});
