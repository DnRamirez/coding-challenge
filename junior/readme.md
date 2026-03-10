# Junior Dev Coding Challenge

## Overview

Welcome to the Junior Developer Coding Challenge! This challenge is designed to assess your ability to build a simple full-stack web application using **Svelte** with a connected database.

## The Challenge

Build a full-stack Svelte application that:

1. **Persists** data to a database of your choice
2. **Displays** that data through a clean, user-friendly web interface
3. **Supports** basic CRUD operations (Create, Read, Update, Delete) on the core data models

## Data Models

Your application should include the following three database models:

### 1. Customers
Represents a customer or client.

**Suggested Fields:**
- `id` - Unique identifier (primary key)
- `name` - Customer name
- `email` - Customer email address
- `phone` - Customer phone number (optional)
- `created_at` - Timestamp when the record was created

### 2. Stores
Represents a store or location.

**Suggested Fields:**
- `id` - Unique identifier (primary key)
- `name` - Store name
- `location` - Store address or location description
- `customer_id` - Foreign key linking the store to a customer
- `created_at` - Timestamp when the record was created

### 3. Products
Represents a product available in a store.

**Suggested Fields:**
- `id` - Unique identifier (primary key)
- `name` - Product name
- `description` - Short product description (optional)
- `price` - Product price
- `store_id` - Foreign key linking the product to a store
- `created_at` - Timestamp when the record was created

## Requirements

### Technical Stack
- **Frontend**: Svelte (SvelteKit is recommended but not required)
- **Backend**: TypeScript or JavaScript with Node.js
- **Database**: Any database of your choice (SQLite, PostgreSQL, MySQL, MongoDB, etc.)

### Functional Requirements
- [ ] Display a list of customers
- [ ] Display a list of stores (optionally filtered by customer)
- [ ] Display a list of products (optionally filtered by store)
- [ ] Add a new customer
- [ ] Add a new store linked to a customer
- [ ] Add a new product linked to a store
- [ ] (Optional) Edit or delete existing records

### General Requirements
- No authentication or authorization required
- No multi-tenancy required
- Keep it simple — a working app is more valuable than a complex, incomplete one

## Getting Started

1. Set up a new SvelteKit project: `npm create svelte@latest my-app`
2. Choose a database and set up your schema with the three models above
3. Build API endpoints (use `+page.server.ts` or `+server.ts` files in SvelteKit)
4. Build your Svelte UI to display and manage the data
5. Test your application end-to-end

## Evaluation Criteria

You will be evaluated on:

1. **Functionality** — Does the app work end-to-end? Can data be saved and retrieved?
2. **Code Quality** — Is the code clean, readable, and organized?
3. **Database Design** — Are the models defined correctly with appropriate relationships?
4. **User Experience** — Is the interface simple and easy to use?

## Submission Guidelines

When you're ready to submit, choose one of the following options:

**Option 1: Branch Push**
- Clone this repository
- Create your own branch with your work
- Push that branch (your final push timestamp will mark completion time)

**Option 2: Fork**
- Fork this repository to your own GitHub account
- Push your work to your fork (your final push timestamp will mark completion time)

**Option 3: Email Only**
- Simply email **colinw@empowerfresh.com** when you're done (your email timestamp will mark completion time)

## Time Expectation

This challenge is designed to be completable in **2–4 hours**. Focus on getting a working end-to-end solution rather than perfecting every detail.

**Tips:**
- Start with SQLite for the database — it requires no external setup
- Use SvelteKit's built-in server-side routes for your backend logic
- AI tools are welcome and encouraged! Use ChatGPT, GitHub Copilot, or any other tools that help you work efficiently

## Questions?

If you have any questions, feel free to reach out. **Email colinw@empowerfresh.com**

Good luck! 🚀
