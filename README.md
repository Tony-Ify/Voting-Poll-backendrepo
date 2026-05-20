# Poll & Voting System - Backend (NestJS)

## 📋 Project Overview

Backend API for a civic engagement platform that allows users to:
- Create accounts with state selection
- Participate in polls
- Vote on polls (one vote per user per poll)
- View voting results filtered by region (state-level)
- Admin features for poll management

Built with **NestJS**, **TypeORM**, and **PostgreSQL**.

---

## 🎯 Project Requirements

### Core Features Implemented

✅ **User Authentication**
- Sign up with email, password, name, and state
- Login with email and password
- JWT-based authentication (7-day expiration)
- Token refresh endpoint
- Password hashing with bcrypt

✅ **Admin Features**
- Create polls (admin only)
- Edit polls (admin only)
- Delete polls (admin only)
- Close/reopen polls (admin only)
- View all polls (active & closed)
- Create other admin users (with secret key)

✅ **Poll Management**
- Create polls with title, description, and 2-4 options
- Update poll details and options
- Close/reopen polls
- Delete polls
- View active and closed polls
- Get poll details with options

✅ **Voting System**
- Vote on active polls
- One vote per user per poll (enforced at database level)
- Vote submission with user state
- Prevent voting on closed polls

✅ **Results & Filtering**
- Get total vote counts for each option
- Calculate percentages
- Filter results by state
- Get results for all states
- Display vote statistics

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| **NestJS** | 10+ | Backend framework |
| **TypeORM** | 0.3+ | ORM for database |
| **PostgreSQL** | 12+ | Database |
| **JWT** | - | Authentication |
| **Passport** | - | Auth strategy |
| **bcryptjs** | - | Password hashing |
| **Node.js** | 18+ | Runtime |

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- PostgreSQL 12+
- npm or yarn
- Git

### Step 1: Clone Repository

```bash
git clone <your-backend-repo-url>
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Setup

Create `.env` file in project root:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=voting_poll_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d

# Admin Secret Key (for creating admins)
ADMIN_SECRET_KEY=admin-super-secret-key-change-this

# Server Configuration
API_PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:4200
```

### Step 4: Create Database

```bash
# Using PostgreSQL
createdb polling_db

# Or using psql
psql -U postgres -c "CREATE DATABASE polling_db;"
```

### Step 5: Run Migrations

```bash
npm run migration:run
```

Or if migrations exist:

```bash
npm run typeorm migration:run
```

### Step 6: Seed Database (Optional)

```bash
npm run seed
```

This creates:
- 1 admin user (admin@example.com / admin123)
- 5 regular users for testing
- 5 sample polls
- Sample votes from different states

### Step 7: Start Server

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start
```

Server will start on `http://localhost:3000`

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/                    # Authentication module
│   │   ├── auth.controller.ts   # Auth routes
│   │   ├── auth.service.ts      # Auth logic
│   │   ├── auth.module.ts       # Auth module
│   │   ├── auth.dto.ts          # DTOs
│   │   └── create-admin.dto.ts  # Admin creation DTO
│   │
│   ├── users/                   # Users module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.module.ts
│   │   ├── users.dto.ts
│   │   └── entities/
│   │       └── user.entity.ts
│   │
│   ├── polls/                   # Polls module
│   │   ├── polls.controller.ts
│   │   ├── polls.service.ts
│   │   ├── polls.module.ts
│   │   ├── poll.dto.ts
│   │   └── entities/
│   │       ├── poll.entity.ts
│   │       └── poll-option.entity.ts
│   │
│   └── votes/                   # Votes module
│       ├── votes.controller.ts
│       ├── votes.service.ts
│       ├── votes.module.ts
│       ├── vote.dto.ts
│       └── entities/
│           └── vote.entity.ts
│
├── common/
│   ├── decorators/
│   │   └── roles.decorator.ts   # @Roles() decorator
│   ├── guards/
│   │   ├── jwt-auth.guard.ts    # JWT authentication guard
│   │   └── roles.guard.ts       # Role-based access guard
│   └── strategies/
│       └── jwt.strategy.ts      # Passport JWT strategy
│
├── database/
│   └── seeds/
│       ├── init.seeder.ts       # Seeding logic
│       └── seed.command.ts      # Seed command
│
├── app.module.ts                # Main application module
├── app.controller.ts
├── app.service.ts
└── main.ts                      # Bootstrap file
```

---

## 🔌 API Endpoints

### Authentication

```
POST   /api/auth/signup              Create new user
POST   /api/auth/login               Login user
POST   /api/auth/create-admin        Create admin user (requires secret key)
GET    /api/auth/verify              Verify token (requires JWT)
POST   /api/auth/refresh             Refresh token (requires JWT)
```

### Users

```
GET    /api/users/profile            Get current user profile (requires JWT)
PUT    /api/users/profile            Update profile (requires JWT)
GET    /api/users/:id                Get user by ID
PUT    /api/users/:id/state          Update user state (requires JWT)
```

### Polls

```
GET    /api/polls                    Get all polls
GET    /api/polls/active             Get active polls
GET    /api/polls/closed             Get closed polls
GET    /api/polls/:id                Get poll details
POST   /api/polls                    Create poll (admin only, requires JWT)
PUT    /api/polls/:id                Update poll (admin only, requires JWT)
PATCH  /api/polls/:id/status         Update poll status (admin only, requires JWT)
DELETE /api/polls/:id                Delete poll (admin only, requires JWT)
```

### Votes

```
POST   /api/votes                    Submit vote (requires JWT)
GET    /api/votes/poll/:pollId/user-vote    Get user's vote (requires JWT)
GET    /api/votes/poll/:pollId       Get all votes for poll
DELETE /api/votes/:id                Delete vote (requires JWT)
```

### Results

```
GET    /api/results/:pollId          Get poll results
GET    /api/results/:pollId/by-state Get results filtered by state
GET    /api/results/:pollId/by-states Get results for all states
```

---

## 🧪 Testing Endpoints

### Using cURL

#### 1. Sign Up

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "state": "LAGOS"
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Create Admin (with secret key)

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "state": "LAGOS",
    "secretKey": "admin-super-secret-key-change-this"
  }'
```

#### 4. Create Poll (as admin)

```bash
curl -X POST http://localhost:3000/api/polls \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "What is your favorite language?",
    "description": "Vote for your preferred programming language",
    "options": [
      {"optionText": "JavaScript"},
      {"optionText": "Python"},
      {"optionText": "Java"},
      {"optionText": "TypeScript"}
    ]
  }'
```

#### 5. Submit Vote

```bash
curl -X POST http://localhost:3000/api/votes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "pollId": 1,
    "optionId": 1,
    "state": "LAGOS"
  }'
```

#### 6. Get Results

```bash
curl http://localhost:3000/api/results/1
```

#### 7. Get Results by State

```bash
curl http://localhost:3000/api/results/1/by-state \
  -H "Content-Type: application/json" \
  -d '{"state": "LAGOS"}'
```

### Using Postman

Import the endpoints above into Postman:
1. Create a collection
2. Add requests with the URLs and bodies
3. Use Bearer token in Authorization tab for protected endpoints
4. Set Content-Type to application/json

---

## 🔐 Authentication

### JWT Token Structure

Token includes:
- `sub`: User ID
- `email`: User email
- `role`: User role (user or admin)
- `iat`: Issue time
- `exp`: Expiration time

### Using Token

Include in request headers:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration

Tokens expire after 7 days (configurable in `.env`).

To refresh:
```bash
POST /api/auth/refresh
Authorization: Bearer YOUR_OLD_TOKEN
```

---

## 👥 User Roles

### User Role
- ✅ View polls
- ✅ Vote on polls
- ✅ View profile
- ✅ View results
- ❌ Create polls
- ❌ Edit polls
- ❌ Delete polls

### Admin Role
- ✅ All user permissions
- ✅ Create polls
- ✅ Edit polls
- ✅ Delete polls
- ✅ Close/reopen polls
- ✅ Create other admin users
- ✅ View admin dashboard

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  state VARCHAR(100) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Polls Table
```sql
CREATE TABLE polls (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_by_id INTEGER REFERENCES users(id),
  status ENUM('active', 'closed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  closed_at TIMESTAMP
);
```

### Poll Options Table
```sql
CREATE TABLE poll_options (
  id SERIAL PRIMARY KEY,
  poll_id INTEGER REFERENCES polls(id) ON DELETE CASCADE,
  option_text VARCHAR(255) NOT NULL,
  display_order INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Votes Table
```sql
CREATE TABLE votes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  poll_id INTEGER REFERENCES polls(id),
  option_id INTEGER REFERENCES poll_options(id),
  state VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, poll_id)  -- One vote per user per poll
);


## 🔍 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload

# Production
npm build                  # Build TypeScript
npm start                  # Start production server

# Database
npm run migration:generate # Create new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration

# Seeding
npm run seed              # Seed database with test data

# Testing
npm run test              # Run unit tests
npm run test:e2e          # Run e2e tests

# Code Quality
npm run lint              # Run ESLint
npm run format            # Format code with Prettier


## 🔒 Security Considerations

✅ **Implemented**
- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control
- SQL injection protection (TypeORM)
- CORS configuration
- Input validation with class-validator

## 📝 Environment Variables Reference

| Variable | Default | Description |
|---|---|---|
| DATABASE_HOST | localhost | PostgreSQL host |
| DATABASE_PORT | 5432 | PostgreSQL port |
| DATABASE_USER | postgres | PostgreSQL user |
| DATABASE_PASSWORD | - | PostgreSQL password |
| DATABASE_NAME | polling_db | Database name |
| JWT_SECRET | - | JWT signing secret |
| JWT_EXPIRATION | 7d | Token expiration |
| ADMIN_SECRET_KEY | - | Secret key for admin creation |
| API_PORT | 3000 | API server port |
| NODE_ENV | development | Environment (development/production) |
| CORS_ORIGIN | http://localhost:4200 | Allowed CORS origin |

---

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [Passport.js Documentation](https://www.passportjs.org)
- [JWT Documentation](https://jwt.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🚀 Deployment

### Prerequisites
- Node.js 18+ on server
- PostgreSQL database
- PM2 or similar process manager (optional)

### Steps
1. Clone repository
2. Create `.env` with production values
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Run migrations: `npm run migration:run`
6. Start server: `npm start`

### Using PM2
```bash
npm install -g pm2
pm2 start dist/main.js --name "polling-api"
pm2 startup
pm2 save
```

---

## 👥 Support & Issues

For issues:
1. Check this README
2. Review [ADMIN_AND_POLLS_SETUP.md](../ADMIN_AND_POLLS_SETUP.md)
3. Check backend logs: `npm run start:dev`
4. Verify database: `psql -U postgres -d polling_db -c "SELECT * FROM users;"`

---

## 📄 License

This project is part of a personal lab project for civic engagement polling.

---

**Last Updated**: May 2026  
**NestJS Version**: 10+  
**Node Version**: 18+  
**Status**: ✅ Production Ready