# RestroHub - Restaurant Management SaaS Platform

A comprehensive, production-ready restaurant management system built with NestJS, Prisma ORM, and PostgreSQL. RestroHub provides complete business solutions for restaurants including POS systems, order management, table management, staff coordination, and advanced analytics.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database](#database)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development](#development)

---

## ✨ Features

- **POS System** - Fast checkout, multiple order types (Dine-in, Takeaway, Online)
- **Order Management** - Lifecycle tracking, real-time status updates, filtering & search
- **Table Management** - Dynamic status (Available, Occupied, Reserved), occupancy metrics
- **Menu Management** - CRUD operations, categories, availability toggle, pricing
- **Staff Management** - Role-based access (Admin, Chef, Waiter, Cashier), status tracking
- **Analytics** - Revenue tracking, order distribution, top items, dashboard stats
- **Settings** - Multi-location support, tax/currency configuration, restaurant profiles

---

## 🛠️ Tech Stack

- **NestJS** v11 - Node.js framework
- **PostgreSQL** + **Prisma ORM** v7 - Type-safe database
- **TypeScript** - Type safety
- **Jest** - Testing
- **Docker Compose** - Database containerization
- **JWT** - Authentication
- **class-validator** - Request validation

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** or **pnpm** (v8.0.0 or higher)
- **PostgreSQL** (v12.0 or higher) - [Download](https://www.postgresql.org/download/)
- **Docker & Docker Compose** (Optional, for containerized database)
- **Git** - For version control

Verify installations:
```bash
node --version
npm --version
postgres --version
```

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/restro-hub.git
cd RestroServer
```

### 2. Install Dependencies
```bash
# Using npm
npm install

# Or using pnpm (recommended for faster installation)
pnpm install
```

### 3. Verify Installation
```bash
npm list @nestjs/common
npm list prisma
npm list typescript
```

---

## 🔧 Environment Setup

### 1. Create Environment File
Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

### 2. Configure .env File
Edit `.env` with your database and application settings:

```env
# Application
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://admin:admin123@localhost:5432/restro_hub?schema=public"
POSTGRES_USER="admin"
POSTGRES_PASSWORD="admin123"
POSTGRES_DB="restro_hub"
POSTGRES_HOST="localhost"
POSTGRES_PORT=5432

# JWT Configuration
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRATION="7d"
```

**Important:** Change sensitive credentials for production environments.

---

## 🗄️ Database

### Database Schema Overview

The application uses the following main entities:

- **Restaurant** - Core restaurant information and settings
- **User** - User authentication and management
- **MenuItem** - Menu items with categories
- **Table** - Restaurant table layout and status
- **Order** - Order management and history
- **Staff** - Staff members and roles
- **Reservation** - Table reservations
- **RestaurantSettings** - Tax rates and currency configuration

### Using Docker Compose (Recommended)

Start PostgreSQL in a Docker container:

```bash
# Start database
docker-compose up -d

# View logs
docker-compose logs -f postgres

# Stop database
docker-compose down
```

### Using Local PostgreSQL

If you have PostgreSQL installed locally, ensure it's running:

```bash
# macOS (Homebrew)
brew services start postgresql

# Windows (Command Prompt as Admin)
net start PostgreSQL

# Linux (systemd)
sudo systemctl start postgresql
```

---

## 📦 Database Migration & Generation

### Run Migrations

Initialize and apply database migrations:

```bash
# Create and apply migrations
npx prisma migrate dev --name "descriptive_migration_name"

# Apply existing migrations
npx prisma migrate deploy

# View migration status
npx prisma migrate status
```

### Generate Prisma Client

Generate type-safe Prisma Client:

```bash
# Generate client files
npx prisma generate

# This is typically done automatically during migrations
```

### View Database (Prisma Studio)

Open visual database editor to inspect and modify data:

```bash
npx prisma studio
```

---

## ▶️ Running the Application

### Development Mode

Start the application with hot-reload enabled:

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev

# Application runs at http://localhost:3000
```

### Production Build

Build the application for production:

```bash
# Build the project
npm run build

# Start production server
npm run start:prod

# Or start production build
npm run start
```

### Debug Mode

Start application with debugging capabilities:

```bash
npm run start:debug
```

---

## 📚 API Documentation

**Base URL:** `http://localhost:3000`

### Available Endpoints

| Resource | Method | Endpoint |
|----------|--------|----------|
| Menu Items | POST/GET/PUT/DELETE | `/menu/items` |
| Orders | POST/GET/PUT | `/orders` |
| Tables | POST/GET/PUT/DELETE | `/tables` |
| Staff | POST/GET/PUT/DELETE | `/staff` |
| Reservations | POST/GET/PUT/DELETE | `/reservations` |
| Restaurant | POST/GET/PUT/DELETE | `/restaurants` |
| Settings | GET/PUT | `/settings/:restaurantId` |
| Reports | GET | `/reports/:type` |

Swagger docs: `http://localhost:3000/api`

---

## 📁 Project Structure

```
src/
├── main.ts                         # Entry point
├── app.module.ts                   # Root module
├── common/                         # Shared utilities & guards
├── modules/                        # Feature modules
│   ├── auth, user, restaurant
│   ├── menu, orders, tables
│   └── staff, reservations, reports, settings

prisma/
├── schema/                         # Modular schemas
├── migrations/                     # Database migrations
└── generated/                      # Generated client
```

---

## 🔨 Development

### Tests
```bash
npm run test              # Unit tests
npm run test:watch       # Watch mode
npm run test:cov         # With coverage
npm run test:e2e         # E2E tests
```

### Code Quality
```bash
npm run lint             # Lint check
npm run lint -- --fix    # Fix issues
npm run format           # Format code
npm run build            # Build for production
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| DB Connection Failed | Check PostgreSQL is running: `psql -U admin -h localhost -d restro_hub` |
| Prisma Client Errors | Regenerate: `npx prisma generate` |
| Port Already in Use | Change in .env: `PORT=3001` |
| Schema Drift | Reset DB: `npx prisma migrate reset --force` (dev only) |
| Migrations Failed | Check migrations exist in `prisma/migrations/` folder |

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 👥 Support

For issues, questions, or suggestions, please contact the development team or create an issue in the project repository.

---

**Version:** 1.0.0  
**Last Updated:** April 2026  
**Status:** Production Ready
# RestroHub-server
# RestroHub-server
