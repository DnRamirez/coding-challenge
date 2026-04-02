import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/schema.ts', // Path to your schema
  out: './drizzle',                    // Where migration files will be stored
  dialect: 'sqlite',                   // Tells Drizzle how to write the SQL
  dbCredentials: {
    url: 'sqlite.db',                  // Path to your SQLite file
  },
});