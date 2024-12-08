# Blog API

## Overview

A robust RESTful API for a blog application built with:

- **NestJS**
- **TypeScript**
- **Firebase Authentication**
- **Prisma ORM**
- **Postgres Database**

## Features

- 🔒 Firebase JWT Authentication
- 📝 Full CRUD Blog Post Operations
- 🛡️ Role-Based Access Control (RBAC)
- 📊 Pagination Support
- 🖼️ Image Upload Functionality

## Prerequisites

- Node.js (v16+)
- Postgres Database
- pnpm package manager

## Project Structure

```
dist/                     # Compiled output
node_modules/             # Dependencies
prisma/                   # Prisma schema and migrations
src/                      # Source code
  ├── modules/               # Firebase authentication module
      ├── posts/              # Blog posts module 
  ├── shared             # Common utilities
test/                     # Unit and integration tests
uploads/                  # Local image storage
.env                      # Environment variables
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/SobhanMoadab/devotel-backend/tree/master
cd devotel-backend
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email>
UPLOAD_PATH=./uploads
```

### 4. Set Up Firebase

- Obtain Firebase service account file
- Place it in the project root as `firebase-service-account.json`

### 5. Prisma Setup

Generate Prisma client:

```bash
pnpm prisma generate
```

Apply migrations:

```bash
pnpm prisma migrate dev
```

## Running the Application

### Development Mode

```bash
pnpm start:dev
```

### Production Build

```bash
pnpm build
pnpm start:prod
```

## API Endpoints

### Authentication

Include Firebase JWT token in the `Authorization` header:

```
Authorization: Bearer <firebase_jwt_token>
```

### Blog Endpoints

| Method | Endpoint     | Description              | Auth Required | Notes                   |
| ------ | ------------ | ------------------------ | ------------- | ----------------------- |
| GET    | `/posts`     | Retrieve all blog posts  | Yes           | Supports pagination     |
| GET    | `/posts/:id` | Retrieve a specific post | Yes           |                         |
| POST   | `/posts`     | Create a new blog post   | Yes           | Requires title, content |
| PUT    | `/posts/:id` | Update a blog post       | Yes           |                         |
| DELETE | `/posts/:id` | Delete a blog post       | Yes           | Admin only              |

## Roles

- **admin**: Full access
- **user**: Limited access (cannot delete posts)

## Deployment Notes

- Build the project: `pnpm build`
- Run migrations: `pnpm prisma migrate deploy`
- Start production: `pnpm start:prod`

## Security Recommendations

- Secure `firebase-service-account.json`
- Protect `.env` file
- Ensure proper write permissions for `uploads` directory

## Postman Collection

Import `Blog-api.postman_collection.json` for API endpoint testing.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [Your License]. See `LICENSE` for more information.

## Contact

Sobhan Moadab - sobhanmoadabdev@gmail.com

Project Link:
Repo[(https://github.com/SobhanMoadab/devotel-backend)]
