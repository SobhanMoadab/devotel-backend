Blog API Documentation Project Setup

This project is a RESTful API for a blog application using NestJS, TypeScript,
Firebase Authentication, Prisma ORM, and Postgres Database. The project allows
authenticated users to perform CRUD operations on blog posts with role-based
access control (RBAC) and pagination. Requirements

    Node.js and Express.js (via NestJS framework)
    Postgres database
    Firebase Authentication
    Prisma ORM for database operations
    pnpm as the package manager
    Environment variables for configuration

Prerequisites

    Node.js: Install Node.js (version 16+ recommended).
    Postgres: Ensure a running instance of Postgres.
    pnpm: Install pnpm globally:

    npm install -g pnpm

Project Structure

dist/ # Compiled output node_modules/ # Dependencies prisma/ # Prisma schema and
migrations src/ # Source code ├── auth/ # Firebase authentication module ├──
posts/ # Blog posts module (controllers, services, DTOs) ├── common/ # Common
utilities (interceptors, guards, etc.) test/ # Unit and integration tests
uploads/ # Local image storage for posts .env # Environment variables
firebase-service-account.json # Firebase service account credentials
package.json # Project metadata and dependencies pnpm-lock.yaml # Lockfile for
dependencies README.md # Project documentation

Setup Instructions

    Clone the Repository

git clone <repository_url> cd <repository_folder>

Install Dependencies

pnpm install

Set Up Environment Variables Create a .env file in the project root and provide
the following:

DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_PRIVATE_KEY=<your_firebase_private_key>
FIREBASE_CLIENT_EMAIL=<your_firebase_client_email> UPLOAD_PATH=./uploads
