import { sql } from "drizzle-orm";
const query = sql`select "hello world" as text`;
console.log(query);