# Library Management System

## 1. Project Overview

The Library Management System is a backend application designed to manage library resources and user activities. It provides a structured way to organise books, manage genres, and maintain user information.

The project uses **PostgreSQL** as its relational database and **Prisma ORM** to define database models, manage relationships, perform database operations, and seed initial records.

## 2. Technologies Used

- **Node.js** – JavaScript runtime environment.
- **NestJS** – Backend application framework.
- **PostgreSQL** – Relational database management system.
- **Prisma ORM** – Database modelling and access.
- **TypeScript** – Programming language used for the backend.
- **Neon** – Hosted PostgreSQL database provider.

## 3. Database Models

The database contains the following main models:

### User
Stores information about people using the library system.

Important fields:
- `id`
- `name`
- `email`
- `role`
- `createdAt`
- `updatedAt`

The User model uses a Role enum with two possible values:
- `PATRON`
- `LIBRARIAN`

### Genre
Stores the different categories of books available in the library.

Important fields:
- `id`
- `name`
- `description`
- `createdAt`
- `updatedAt`

### Book
Stores information about books in the library.

Important fields:
- `id`
- `title`
- `author`
- `isbn`
- `description`
- `publishedYear`
- `availableCopies`
- `genreId`
- `createdAt`
- `updatedAt`

Each book belongs to one genre through the `genreId` foreign key.

### Review
Stores reviews submitted by users about books.

Important fields:
- `id`
- `rating`
- `comment`
- `bookId`
- `userId`
- `createdAt`

A review is connected to one book and one user. The combination of `bookId` and `userId` is unique, preventing a user from submitting multiple reviews for the same book.

## 4. Database Relationships

The database uses relational connections:

- One Genre can have many Books.
- Each Book belongs to one Genre.
- One User can write many Reviews.
- One Book can receive many Reviews.
- Each Review belongs to one User and one Book.

These relationships are implemented using Prisma relations and foreign keys.

## 5. Schema Decisions

### Why does Book reference Genre instead of embedding genre information?

The Book model references the Genre model through a foreign key called `genreId` rather than storing the entire genre information inside every book record.

This design was chosen for the following reasons:

**1. Reduced data duplication**

If genre information were stored directly in every book record, the same genre name and description would be repeated across multiple records. Referencing Genre avoids unnecessary duplication.

**2. Improved data consistency**

When a genre name or description changes, it only needs to be updated in the Genre table. All related books continue to reference the same genre record.

**3. Easier data management**

The library can create, update, or manage genres independently of individual books.

**4. Better relational structure**

The relationship between Genre and Book is one-to-many. A genre can be associated with several books, while each book belongs to one genre.

This approach supports database normalisation and helps maintain data integrity.

## 6. Prisma ORM and Document Databases

One important difference between Prisma with PostgreSQL and a document database such as MongoDB is how relationships are represented and managed.

With PostgreSQL, related information is commonly stored in separate tables and connected using primary keys and foreign keys. Prisma makes these relationships easier to define and query.

In a document database, related information may be embedded inside documents or connected through references. This provides flexibility but can introduce data duplication when information is embedded in multiple documents.

## 7. Project Setup

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL database or a hosted PostgreSQL database
- Git

### Step 1: Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Navigate into the project:

```bash
cd library-management-system
```

### Step 2: Navigate to the API folder

```bash
cd api
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Configure environment variables

Create a `.env` file inside the `api` folder.

Add your PostgreSQL connection string:

```env
DATABASE_URL="your_postgresql_connection_string"
```

Use `.env.example` as a reference when configuring your environment.

**Important:** Never commit your actual `.env` file or expose your database credentials.

### Step 5: Validate the Prisma schema

```bash
npx prisma validate
```

### Step 6: Generate Prisma Client

```bash
npx prisma generate
```

### Step 7: Run database migrations

```bash
npx prisma migrate dev --name init
```

### Step 8: Seed the database

```bash
npx prisma db seed
```

The seed script populates the database with at least four genres and fifteen books distributed across those genres.

### Step 9: View the database

```bash
npx prisma studio
```

Prisma Studio provides a visual interface for viewing and managing database records.

## 8. Environment Variables

The application uses the following environment variable:

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL database connection string |

A sample configuration is provided in `api/.env.example`.

## 9. Database Seeding

The project includes a Prisma seed script located at:

`api/prisma/seed.ts`

The script creates initial records for:
- Four or more book genres.
- Fifteen or more books distributed across the genres.
- Sample users and a review, if the optional Review model is included.

The seed script uses upsert operations to reduce duplicate records when it is run more than once.

## 10. Project Structure

```text
library-management-system/
│
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   └── prisma/
│   │       └── prisma.service.ts
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── README.md
└── .gitignore
```

## 11. Conclusion

The Library Management System database is designed using relational database principles. Prisma ORM provides a structured approach to defining models, managing relationships, validating the schema, and interacting with PostgreSQL.

The use of foreign keys, unique constraints, and database migrations helps maintain data consistency and provides a foundation for expanding the library management application.