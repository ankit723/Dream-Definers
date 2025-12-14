# Email Queue System Setup

## Overview

The email queue system ensures that form submissions (contact, consultancy, blog notifications) always succeed, even if email sending fails. Emails are queued and processed asynchronously with automatic retries.

## Database Migration

First, run the migration to create the EmailQueue table:

```bash
npx prisma migrate dev --name add_email_queue
```

## Cron Job Setup

The email queue needs to be processed periodically. You have several options:

### Option 1: Vercel Cron (Recommended for Vercel deployments)

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/process-email-queue",
      "schedule": "*/5 * * * *"
    }
  ]
}
```

This runs every 5 minutes. Make sure to set `CRON_SECRET` in your environment variables.

### Option 2: External Cron Service

Use a service like:
- **cron-job.org** (free)
- **EasyCron** (free tier available)
- **UptimeRobot** (free)

Set up a cron job to call:
```
GET https://your-domain.com/api/cron/process-email-queue
Authorization: Bearer YOUR_CRON_SECRET
```

Schedule: Every 5 minutes (`*/5 * * * *`)

### Option 3: Manual Trigger (Development)

For development, you can manually trigger the queue processing:

```bash
curl -X POST http://localhost:3000/api/cron/process-email-queue \
  -H "Authorization: Bearer YOUR_CRON_SECRET"
```

## Environment Variables

Add to your `.env.local`:

```env
CRON_SECRET=your-secret-key-here
FROM_EMAIL=your-verified-email@domain.com
ADMIN_EMAIL=dreamdefinerstrainingacademy@gmail.com
RESEND_API_KEY=your-resend-api-key
```

## How It Works

1. **Form Submission**: When a user submits a form:
   - Data is saved to database immediately
   - Email is queued (non-blocking)
   - User gets immediate success response

2. **Email Processing**: Cron job runs every 5 minutes:
   - Fetches pending emails
   - Attempts to send via Resend
   - Updates status (sent/failed)
   - Schedules retries for failed emails

3. **Retry Logic**:
   - Exponential backoff: 5min, 10min, 20min, 40min, 80min, max 6hr
   - Maximum 5 retries per email
   - After max retries, email is marked as permanently failed

## Admin Features

- **View Email Queue**: `/admin/email-queue`
  - See all queued emails
  - Filter by status/type
  - View error messages
  - Manually retry failed emails

- **Create Admin**: `/admin/create-admin`
  - Only existing admins can create new admins
  - Secure admin creation

## Utility Script

If all admins are deleted, use the utility script to create a new one:

```bash
npx tsx scripts/create-admin.ts email@example.com password123 "Admin Name"
```

## Monitoring

Check the email queue stats in the admin dashboard:
- Pending emails
- Processing emails
- Sent emails
- Failed emails

Failed emails can be manually retried from the email queue page.

