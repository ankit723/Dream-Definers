# Prisma Database Setup Guide

## Prerequisites
- PostgreSQL database (local or cloud-hosted)
- Node.js and pnpm installed

## Setup Steps

### 1. Environment Variables
Create a `.env` file in the root directory with your database connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/dream_definers?schema=public"
```

For production, use your cloud database URL (e.g., from Supabase, Railway, Neon, etc.)

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Database Migrations
```bash
npx prisma db push
```

This will create the `Contact` and `Consultancy` tables in your database.

### 5. (Optional) Open Prisma Studio
To view and manage your data:
```bash
npx prisma studio
```

## Database Schema

### Contact Table
- Stores contact form submissions
- Fields: id, name, email, phone, subject, message, createdAt, updatedAt
- Indexed on: email, createdAt

### Consultancy Table
- Stores free consultancy form submissions
- Fields: id, name, email, phone, program, message, createdAt, updatedAt
- Indexed on: email, program, createdAt

## API Endpoints

### POST `/api/contact`
Accepts contact form submissions and saves to database.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 1234567890",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

### POST `/api/consultancy`
Accepts consultancy form submissions and saves to database.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+91 9876543210",
  "program": "Aviation",
  "message": "I'm interested in this program..."
}
```

## Next Steps

1. **Email Notifications**: Integrate email service (Nodemailer, SendGrid, Resend) to send notifications when forms are submitted
2. **Admin Dashboard**: Create an admin panel to view and manage submissions
3. **Rate Limiting**: Add rate limiting to prevent spam
4. **Validation**: Add more robust validation and sanitization

## Troubleshooting

- If you get connection errors, check your `DATABASE_URL` in `.env`
- Make sure PostgreSQL is running
- Run `npx prisma generate` after schema changes
- Run `npx prisma db push` to sync schema with database

