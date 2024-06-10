import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

console.log("migrating...........");
const migrationClient = postgres(process.env.CONNECTION_STRING, { max: 1 });
await migrate(drizzle(migrationClient), {
  migrationsFolder: "./drizzle",
});

console.log("Migration complete");
