# Getting Started

## Install Dependencies

Install the required packages:

```sh
npm install
npm install drizzle-orm better-sqlite3
npm install -D drizzle-kit @types/better-sqlite3
```

## Setup Database

Push the database schema using Drizzle:

```sh
npx drizzle-kit push
```

This will create and sync the SQLite database.

## Run the Development Server

Start the app:

```sh
npm run dev
```

