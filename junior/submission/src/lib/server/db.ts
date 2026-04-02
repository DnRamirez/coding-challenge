import { drizzle } from 'drizzle-orm/better-sqlite3'; 
import Database from 'better-sqlite3';
import * as schema from './schema';

// Create a connection to the SQLite database 
const grocerDB = new Database('grocer.db');
export const db = drizzle(grocerDB, { schema });
