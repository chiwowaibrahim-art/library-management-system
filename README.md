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

# Library Management System API

A RESTful backend application for managing library operations, developed using NestJS, TypeScript, PostgreSQL and Prisma ORM.

## 1. Project Overview

The Library Management System API provides a backend solution for managing books, genres and users in a library environment.

It supports user registration and authentication, book management, genre management, book searching, filtering and pagination. It also implements JWT authentication and role-based authorization to control access to protected operations.

## 2. Technologies Used

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| TypeScript | Programming language |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and management |
| Passport.js | Authentication strategy integration |
| JWT | Token-based authentication |
| bcrypt | Password hashing |
| class-validator | Request validation |
| class-transformer | Request data transformation |
| Postman | API testing |

## 3. Features

### Authentication and Users
- User registration.
- User login.
- Password hashing using bcrypt.
- JWT access token generation.
- User management.
- Support for Patron and Librarian roles.

### Book Management
- Create books.
- Retrieve all books.
- Retrieve a book by ID.
- Update books.
- Delete books.
- Filter books by genre.
- Search books by title or author.
- Paginate book results.

### Genre Management
- Create genres.
- Retrieve all genres.
- Retrieve a genre by ID.
- Update genres.
- Delete genres.

### Security and Validation
- JWT-based authentication.
- Role-based authorization.
- Librarian-only book write operations.
- Librarian-only user write operations.
- Password hashing using bcrypt.
- Global request validation.
- Rejection of unexpected request properties.
- CORS enabled.

## 4. Project Structure

```text
library-management-system/
│
├── README.md
│
└── api/
    ├── prisma/
    │   ├── migrations/
    │   ├── schema.prisma
    │   └── seed.ts
    │
    ├── src/
    │   ├── auth/
    │   ├── books/
    │   ├── genres/
    │   ├── users/
    │   ├── prisma/
    │   ├── app.module.ts
    │   └── main.ts
    │
    ├── docs/
    │   └── postman_collection.json
    │
    ├── .env.example
    ├── package.json
    └── tsconfig.json
```

## 5. Requirements

Before running the application, ensure you have:

- Node.js and npm installed.
- PostgreSQL database access.
- Git installed.
- Postman for API testing.

## 6. Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/chiwowaibrahim-art/library-management-system.git
```

### Step 2: Navigate to the API directory

```bash
cd library-management-system/api
```

### Step 3: Install dependencies

```bash
npm install
```

### Step 4: Configure environment variables

Create a `.env` file in the `api` directory using `.env.example` as a reference.

Configure the following variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secure-jwt-secret"
JWT_EXPIRES_IN="1d"
```

Replace the placeholders with your actual database connection string and a strong JWT secret.

Never commit your real `.env` file or expose your database credentials.

### Step 5: Generate Prisma Client

```bash
npx prisma generate
```

### Step 6: Apply database migrations

```bash
npx prisma migrate deploy
```

### Step 7: Seed the database

If the Prisma seed command is configured in the project:

```bash
npx prisma db seed
```

### Step 8: Start the development server

```bash
npm run start:dev
```

The API will run at:

```text
http://localhost:3000
```

## 7. API Endpoints

All endpoints use the base URL:

```text
http://localhost:3000
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a user |
| POST | `/auth/login` | Authenticate a user |

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a user |
| GET | `/users` | Retrieve all users |
| GET | `/users/:id` | Retrieve a user |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Genres

| Method | Endpoint | Description |
|---|---|---|
| POST | `/genres` | Create a genre |
| GET | `/genres` | Retrieve all genres |
| GET | `/genres/:id` | Retrieve a genre |
| PATCH | `/genres/:id` | Update a genre |
| DELETE | `/genres/:id` | Delete a genre |

### Books

| Method | Endpoint | Description |
|---|---|---|
| POST | `/books` | Create a book |
| GET | `/books` | Retrieve books |
| GET | `/books/:id` | Retrieve a book |
| PATCH | `/books/:id` | Update a book |
| DELETE | `/books/:id` | Delete a book |
| GET | `/books?genreId=:genreId` | Filter books by genre |
| GET | `/books?search=:term` | Search books by title or author |
| GET | `/books?page=1&limit=10` | Paginate books |

## 8. Authentication and Authorization

The application uses JSON Web Tokens (JWT) to authenticate users.

After a successful login, the API returns an access token. Include this token in the Authorization header when accessing protected endpoints.

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The application supports two user roles:

- **PATRON:** A regular library user.
- **LIBRARIAN:** A user authorised to perform protected management operations.

Book creation, updating and deletion are restricted to Librarians. User creation, updating and deletion are also restricted to Librarians.

The API returns:
- `401 Unauthorized` when authentication is missing or invalid.
- `403 Forbidden` when an authenticated user lacks the required role.

## 9. API Testing with Postman

The Postman collection is included in:

```text
api/docs/postman_collection.json
```

To test the API:

1. Open Postman.
2. Import the JSON collection.
3. Set the `baseUrl` collection variable to `http://localhost:3000`.
4. Register or log in to obtain access tokens.
5. Configure the relevant token variables.
6. Run the requests in the collection.

The collection covers authentication, Users CRUD, Genres CRUD, Books CRUD, filtering, searching, pagination and authorization tests.

## 10. Build Verification

To verify that the application compiles successfully, run:

```bash
npx nest build
```

## 11. Environment and Security Notes

- Keep database credentials in `.env`.
- Do not commit `.env` to GitHub.
- Use a strong and private JWT secret.
- Use `.env.example` to document required environment variables.
- Passwords are hashed using bcrypt before storage.
- Protected operations use JWT authentication and role-based authorization.

## 12. Project Status

The core API features have been implemented and tested, including CRUD operations, authentication, authorization, filtering, searching, pagination and request validation.

The project includes a Postman collection for API testing and documentation.