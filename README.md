# Library Management System

A full-stack Library Management System built with **NestJS, React, PostgreSQL and Prisma ORM**. The application provides a digital library catalogue where users can browse books, search by title or author, filter by genre and view book information.

## 1. Project Overview

The Library Management System is designed to manage library resources and user activities.

The project consists of two main applications:

- **Backend API:** Handles database operations, authentication, authorization, book management, genre management and user management.
- **Frontend:** Provides a responsive interface for browsing, searching, filtering and viewing books.

PostgreSQL is used as the relational database, while Prisma ORM manages database models, relationships and queries.

## 2. Technologies Used

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| NestJS | Backend framework |
| TypeScript | Programming language |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and management |
| Passport.js | Authentication integration |
| JWT | Token-based authentication |
| bcrypt | Password hashing |
| class-validator | Request validation |
| class-transformer | Data transformation |

### Frontend

| Technology | Purpose |
|---|---|
| React | User interface development |
| Vite | Frontend development and build tool |
| JavaScript | Frontend programming |
| React Router DOM | Client-side navigation |
| CSS3 | Styling and responsive layouts |

### Other Tools

- Neon – Hosted PostgreSQL database.
- Postman – API testing.
- Git and GitHub – Version control.

## 3. Main Features

### Book Management
- Create, retrieve, update and delete books.
- View individual book details.
- Search books by title or author.
- Filter books by genre.
- Paginate book results.

### Genre Management
- Create and manage book genres.
- Retrieve all available genres.
- Update and delete genres.

### User Management and Security
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based authorization.
- Support for Patron and Librarian roles.
- Librarian-only book and user write operations.

### Frontend Features
- Responsive book catalogue.
- Search books by title and author.
- Debounced live search.
- Filter books by genre.
- Sort books by title or author.
- Individual book details pages.
- Loading indicators and skeleton cards.
- Friendly error messages.
- Empty search result messages.
- Responsive layouts for desktop, tablet and mobile devices.

## 4. Project Structure

```text
library-management-system/
│
├── api/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── auth/
│   │   ├── books/
│   │   ├── genres/
│   │   ├── users/
│   │   ├── prisma/
│   │   ├── app.module.ts
│   │   └── main.ts
│   │
│   ├── docs/
│   │   └── postman_collection.json
│   ├── .env.example
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookCard.jsx
│   │   │   ├── BookGrid.jsx
│   │   │   ├── GenreFilter.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── SkeletonCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   └── BookDetail.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## 5. Database Models

The main database models include:

### User
Stores library user information, including name, email and role.

Supported roles:
- PATRON
- LIBRARIAN

### Genre
Stores book categories, including genre name and description.

### Book
Stores book information, including:
- Title
- Author
- ISBN
- Description
- Published year
- Available copies
- Genre ID

### Review
Stores user reviews and ratings associated with books.

A review is connected to one user and one book. The combination of `bookId` and `userId` is unique.

## 6. Database Relationships

The database uses the following relationships:

- One Genre can have many Books.
- Each Book belongs to one Genre.
- One User can write many Reviews.
- One Book can receive many Reviews.
- Each Review belongs to one User and one Book.

These relationships are implemented using Prisma relations and foreign keys.

## 7. Requirements

Before running the application, ensure you have:

- Node.js and npm.
- PostgreSQL database access or a hosted PostgreSQL database.
- Git.
- Postman (for API testing).

## 8. Installation and Setup

### Step 1: Clone the repository

```bash
git clone https://github.com/chiwowaibrahim-art/library-management-system.git
```

Navigate into the project:

```bash
cd library-management-system
```

### Step 2: Configure the backend

Navigate to the API directory:

```bash
cd api
```

Install dependencies:

```bash
npm install
```

Create an `.env` file inside the `api` directory.

Configure the following environment variables:

```env
DATABASE_URL="your-postgresql-connection-string"
JWT_SECRET="your-secure-jwt-secret"
JWT_EXPIRES_IN="1d"
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Seed the database if the seed command is configured:

```bash
npx prisma db seed
```

Start the backend development server:

```bash
npm run start:dev
```

The API will run at:

```text
http://localhost:3000
```

### Step 3: Configure the frontend

Open a second terminal and navigate to the client directory:

```bash
cd library-management-system/client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `client` directory.

Add:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

Open this address in your browser to access the application.

**Important:** Both the backend and frontend development servers must be running for the application to retrieve library data.

## 9. API Endpoints

Base URL:

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
| GET | `/users` | Retrieve users |
| GET | `/users/:id` | Retrieve a user |
| PATCH | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

### Genres

| Method | Endpoint | Description |
|---|---|---|
| POST | `/genres` | Create a genre |
| GET | `/genres` | Retrieve genres |
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
| GET | `/books?genreId=:genreId` | Filter by genre |
| GET | `/books?search=:term` | Search by title or author |
| GET | `/books?page=1&limit=10` | Paginate results |

## 10. Authentication and Authorization

The backend uses JSON Web Tokens (JWT) to authenticate users.

After successful login, the API returns an access token. Include it in the Authorization header when accessing protected endpoints:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The system supports two roles:

- **PATRON:** A regular library user.
- **LIBRARIAN:** A user authorised to perform protected management operations.

The API returns:
- `401 Unauthorized` when authentication is missing or invalid.
- `403 Forbidden` when an authenticated user lacks the required permissions.

## 11. API Testing with Postman

The Postman collection is available at:

```text
api/docs/postman_collection.json
```

To test the API:

1. Open Postman.
2. Import the collection.
3. Set the `baseUrl` variable to `http://localhost:3000`.
4. Register or log in to obtain access tokens.
5. Configure the relevant token variables.
6. Execute the requests.

The collection covers authentication, CRUD operations, filtering, searching, pagination and authorization tests.

## 12. Build Verification

### Backend

From the `api` directory:

```bash
npx nest build
```

### Frontend

From the `client` directory:

```bash
npm run build
```

Successful builds indicate that the respective applications compile without build errors.

## 13. Environment and Security Notes

- Keep database credentials inside the backend `.env` file.
- Keep the JWT secret private.
- Do not commit actual `.env` files to GitHub.
- Use `.env.example` to document backend environment variables.
- The frontend `.env` should contain the API URL, not database credentials or JWT secrets.
- Passwords are hashed using bcrypt before storage.
- Protected backend operations use JWT authentication and role-based authorization.

## 14. Project Status

The Library Management System includes a NestJS backend API and a React frontend.

The backend implements database management, CRUD operations, authentication, authorization, filtering, searching, pagination and request validation.

The frontend provides a responsive book catalogue with search, genre filtering, sorting, individual book details and user-friendly loading and error states.

Both applications have been built and the core frontend functionality has been tested.