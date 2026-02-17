# Grocery Data Processing Challenge

## Overview

Welcome to the Grocery Data Processing Challenge! This challenge combines data processing, ETL (Extract, Transform, Load), and full-stack development skills. You'll be working with real-world grocery data files that require cleaning and processing before being displayed in a web application.

## The Challenge

Build a full-stack application that:

1. **Ingests** multiple CSV files from different grocery stores
2. **Processes and cleans** the data through ETL pipelines
3. **Persists** the cleaned data in a SQL database
4. **Displays** the data in a meaningful way through a web interface

## The Data

### Overview

This challenge includes data from **three different grocery stores**. Each store provides their data in a slightly different format, which is part of the real-world challenge you'll need to handle:

1. **Colin's Market** (`grocers-files/colins-market/`)
2. **J&A Grocers** (`grocers-files/J&A-grocers/`)
3. **Stevens Produce** (`grocers-files/stevens-produce/`)

### File Types

Each grocery store provides three types of CSV files:

1. **Product Files** - Product catalog information
2. **Price Files** - Pricing data for products
3. **Sales Files** - Actual transaction records

⚠️ **Note**: Each store uses different file naming conventions and may have slight variations in their data formats. Part of your challenge is to build an ETL process flexible enough to handle all three stores.

---

### 1. Product Files

Product files contain the catalog of items available at each store.

**Common Fields:**
- `upc_plu` - Universal Product Code / Price Look Up code (unique product identifier)
- `description` - Product name/description
- `department` - Department name or code
- `category` - Product category (may be named `Category` or `category`)
- `unit_size` - Size of one unit (e.g., "1LB", "16OZ", "EACH")
- `pack_size` - Pack size (may be named `Pack` or `pack_size`)
- `link_code` - Optional linking code for related products (may be named `LinkCode` or `link_code`)

**Key Considerations:**
- **Generally**, product files apply to all stores within a grocer (not store-specific)
- However, some grocers may provide store-specific product files - so your ETL could handle both scenarios
- It's acceptable for all products to be visible across all stores within a grocer
- Different stores may use different capitalization for column names
- Some fields may be empty or NULL
- Product descriptions may have inconsistent casing

---

### 2. Price Files

Price files contain current and historical pricing information.

**Common Fields:**
- `store` - Store identifier/location
- `upc_plu` - Product identifier (links to Product files)
- `price` - Price amount
- `price_type` - Type of pricing:
  - `REG` = Regular price
  - `AD` = Advertised/promotional price
  - `TPR` = Temporary Price Reduction
  - `STR` = Store specific price
  - `MGR` = Manager special
- `price_priority` - Priority level (higher priority prices override lower priority)
- `price_multiple` - Multiple unit pricing (e.g., "2 for $5")
- `unit_multiple` - Number of units in multiple pricing
- `start_date` - When price becomes effective
- `end_date` - When price expires (empty/NULL means no expiration)

**Key Considerations:**
- **If a price has a start date but no end date, it's valid indefinitely from that start date**
- Prices may have missing values
- Date formats may vary between stores
- Multiple price types can exist for the same product
- Some stores use different column naming conventions

---

### 3. Sales Files

Sales files contain transaction records showing actual sales that occurred.

**Common Fields:**
- `store` - Store identifier
- `upc_plu` - Product identifier (should link to Product files)
- `unit_size` - Size description
- `description` - Product description
- `sale_time` - When the sale occurred (may be Unix timestamp or date string)
- `sale_time_zone` - Timezone of the transaction
- `price_type` - Type of price used for this sale
- `price_priority` - Priority level of the price
- `price_multiple` - Multiple pricing if applicable
- `unit_multiple` - Number of units for multiple pricing
- `unit_price` - Price per unit
- `units_sold` - Quantity sold (may be decimal for weighted items)
- `total_sale` - Total sale amount (may be named `Sales_Total` or `total_sale`)

**Key Considerations:**
- **Your ETL should aggregate sales across product IDs/UPCs** when processing
- Sales data may reference products that don't exist in Product files (orphaned records)
- Timestamps may be in different formats (Unix epoch vs. date strings)
- Some sales may have missing or invalid data
- Weighted items (like produce) will have fractional quantities

## Data Quality Issues

⚠️ **Important**: The data files contain intentional quality issues that mirror real-world scenarios. Your ETL process must handle these robustly:

### Common Issues You'll Encounter:

1. **Missing Data**
   - NULL values in required fields
   - Empty descriptions or categories
   - Missing prices for certain products
   - Incomplete records

2. **Inconsistent Formatting**
   - Mixed capitalization (UPPERCASE, lowercase, Mixed Case)
   - Extra whitespace in fields
   - Column name variations (`Category` vs `category`, `Pack` vs `pack_size`)
   - Different date/timestamp formats between stores

3. **Data Integrity Issues**
   - **Orphaned records**: Sales transactions for products that don't exist in the product catalog
   - Missing prices for products that have sales
   - Products without categories
   - Invalid or placeholder UPC codes (e.g., 999999999999)

4. **Format Variations**
   - Different file naming conventions per store
   - Unix timestamps vs. formatted date strings
   - Multiple timezone representations
   - Decimal precision variations in prices and quantities

5. **Business Logic Challenges**
   - Multiple active prices for the same product (different price types)
   - Overlapping price effective dates
   - Expired promotional prices still in use
   - Weighted vs. unit-based products

### Your ETL Should:

**Primary Goals (Required):**
- **Clean** data (trim whitespace, normalize casing, handle missing values)
- **Persist** cleaned data into the SQL database
- **Decide** how to handle missing/invalid data (skip, use defaults, flag for review)

**Nice-to-Have (Optional):**
- Detect and log data quality issues
- Report on data quality metrics (e.g., "X% of sales were orphaned")
- Create data quality dashboards

> **Focus on getting data cleaned and loaded into the database first.** Logging and reporting are valuable but not essential for this challenge.

### 💡 Important Philosophy

**Don't get bogged down in data intricacies!** 

Real-world data is messy and will never be perfect. Your goal is to:
- ✅ **Persist the data** in a database (even if it's not perfect)
- ✅ **Display it** in the app so users can see products, sales, and prices at each store/customer
- ❌ Don't spend hours trying to understand complex fields like `link_code`, `price_types` or other obscure data relationships

**What matters most:** Building a working app that shows the data, not achieving perfect data understanding. Get something working end-to-end, then refine if time allows.

## Requirements

### General Technical Requirements
- Build **one Svelte app** that includes both frontend and backend functionality
- The app should connect to a **local SQL database**
- **Frontend**: Must use **Svelte**
- **Backend**: Use **TypeScript/Node.js** (TypeScript preferred, but JavaScript is fine for development speed)
- **Database**: Use a **SQL database** (PostgreSQL, MySQL, SQLite, etc.)
- **Optional**: Incorporate **Python** for ETL processing if you prefer
- No authentication/authorization required
- No multi-tenancy required

### Backend/ETL

**Architecture:**
- Build everything within a **single Svelte app** that connects to a local SQL database
- Create API endpoints in  **`page.server.ts`** files (or similar server-side routes)
- Structure your ETL jobs however you see fit:
  - One job per file type (products, prices, sales)
  - One job that handles all file types
  - Separate jobs per store
  - Any other approach that makes sense to you

**ETL Requirements:**
- [ ] Build an ETL pipeline or multiple pipelines that can ingest all three file types from multiple stores
- [ ] Clean and normalize the data (primary focus!)
- [ ] Design and implement a SQL database schema to store the data
- [ ] Aggregate sales data across product IDs/UPCs
- [ ] Handle data quality issues gracefully (decide how to handle missing data, duplicates, etc.)

**API Endpoints:**
- [ ] Upload CSV files
- [ ] Process/import files (trigger ETL jobs)
- [ ] Retrieve processed data
- [ ] (Optional) Get processing status/results

### Frontend

Your Svelte app should have **two main sections**:

#### Part 1: ETL/Import Section
- [ ] Create a UI to upload CSV files (one at a time or all at once)
- [ ] Add an "Import" button or some ui that triggers your ETL jobs
- [ ] This is where users will upload the data files and run the processing

#### Part 2: Data Viewing Section
- [ ] Display the cleaned and imported data in an organized, readable format
- [ ] **Key requirement**: Show **products, prices, and sales by store and by customer**
- [ ] Use tables, charts, or other visualizations to make the data meaningful
- [ ] **Additional suggested features** (implement what makes sense):
  - Filter by store
  - Filter by customer/grocer
  - Show aggregated sales across stores
  - Price comparisons
  - Sales trends

**Expected Flow:** Users upload CSVs in Part 1 → click import to run ETL → navigate to Part 2 to view the processed data.

**Tip:** While not required, using TypeScript types and interfaces for your data structures (products, prices, sales, etc.) can help keep your code organized and catch errors early.

## Evaluation Criteria

You will be evaluated on:

1. **Data Processing Skills**
   - Quality of ETL logic
   - How you handle data quality issues
   - Database schema design

2. **Code Quality**
   - Clean, readable code
   - Proper error handling
   - Good separation of concerns

3. **User Experience**
   - Intuitive interface
   - Clear data presentation
   - Helpful feedback messages

4. **Completeness**
   - All functional requirements met
   - Works end-to-end

**Live Testing:** During the follow-up review, be prepared to demonstrate your solution by importing new sample files we'll provide. This tests whether your ETL code is flexible and robust, not just hardcoded to the specific files in this repository.

## Database Schema Guidance

**⏱️ Time Budget: Plan to spend 30-60 minutes maximum on your database schema.**

Keep it simple! You'll need at least these tables:

### Suggested Tables:

1. **`customers`** (or `grocers`)
   - Store information about each grocery chain (Colin's Market, J&A Grocers, Stevens Produce)
   - Basic fields: `id`, `name`

2. **`stores`**
   - Individual store locations within each grocery chain
   - Basic fields: `id`, `customer_id`, `store_code`, `name`

3. **`products`**
   - Product catalog items
   - Key fields: `id`, `customer_id`, `upc_plu`, `description`, `department`, `category`, `unit_size`, `pack_size`
   - Handle missing/NULL values as you see fit

4. **`prices`**
   - Pricing information for products
   - Key fields: `id`, `store_id`, `product_id` (or `upc_plu`), `price`, `price_type`, `start_date`, `end_date`
   - Note: end_date can be NULL (means valid indefinitely)

5. **`sales`**
   - Transaction records
   - Key fields: `id`, `store_id`, `product_id` (or `upc_plu`), `sale_time`, `units_sold`, `unit_price`, `total_sale`

### Schema Tips:

- **Don't overthink relationships** - start with basic foreign keys if you want them, or just store IDs
- **Handle missing data pragmatically** - make fields nullable where appropriate
- **You don't need perfect normalization** - a working schema is better than a perfect schema
- **Consider just storing the essential fields** - you can always add more columns later
- If you're spending more than an hour on the schema, you're overthinking it!

## Getting Started

1. Explore the sample data files in the `grocers-files/` directory (but don't overthink them!)
2. **Set up your database tables** (use the guidance above, keep it simple - 30-60 min max!)
3. Build up a svelte app with route(s) for etl jobs and routes for displaying data
4. Build your ETL pipeline in the etl routes in your svelte app
5. Build your frontend UI in other routes in your svelte app to display the data
6. Test with the provided data files

**Tip:** Start simple and get something working first. You can always add complexity later if time allows.

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

**Note:** The completion timestamp (either your final git push or email) should be within 24 hours of receiving the challenge. After submission, we'll schedule a follow-up call in the next few days to review your code and discuss your implementation approach.

## Technology Stack

**Required:**
- **One Svelte app** with both frontend and backend
- Frontend: **Svelte**
- Backend: **TypeScript/Node.js** (TypeScript preferred, but JavaScript is acceptable)
- Database: **SQL database** of your choice (PostgreSQL, MySQL, SQLite, etc.)

**Optional:**
- **Python** for ETL processing if you prefer
- Any libraries or packages that help you complete the challenge

**Development Tools:**
- **AI tools are welcome and encouraged!** Feel free to use ChatGPT, GitHub Copilot, or any other AI assistants in your development process. This is expected in modern development, so use whatever tools help you work efficiently.

## Time Expectation

**Submission Window:** You have **24 hours** from when you receive this challenge to submit your final solution (via git push or email).

**Actual Work Time:** We recognize this is a substantial exercise. Realistically, this challenge could take anywhere from **a few hours to 12 hours** depending on your approach:
- If you get a working end-to-end solution in a few hours and feel good about it - **submit it!** 
- If you want to go above and beyond with polish, testing, handle many edge cases - take the full time available

The important thing is a **working solution**, not perfection.

Focus on:
- Getting a working end-to-end solution
- Persisting data in the database and displaying it in the app
- Creating a functional, usable interface
- **Don't aim for perfection** - the data will never be perfect, and that's okay!

**Remember:** A working app that displays the data is better than spending hours trying to perfectly understand every data field. Quality over quantity - a simple, well-executed solution is better than a complex, incomplete one.

## Questions?

If you have any questions about the requirements, feel free to reach out. We're here to help! **Email colinw@empowerfresh.com** 

Good luck! 🚀
