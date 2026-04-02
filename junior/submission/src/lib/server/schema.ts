import { sql } from 'drizzle-orm';
import {sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Using Drizzle ORM to define table schemas 

export const customers = sqliteTable('customers', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(), 
    email: text('email'),
    phone: text('phone'),
    created_at: text('created_at').notNull().default(sql`(current_timestamp)`)});

export const stores = sqliteTable('stores', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(), 
    location: text('location'),
    // Store -> Customer relationship (foreign key)
    customer_id: integer('customer_id').notNull().references(() => customers.id, { onDelete: 'cascade' }),
    created_at: text('created_at').notNull().default(sql`(current_timestamp)`)});

export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    price: integer('price').notNull(),
    // Product -> Store relationship (foreign key)
    store_id: integer('store_id').notNull().references(() => stores.id, { onDelete: 'cascade' }),
    created_at: text('created_at').notNull().default(sql`(current_timestamp)`)});


