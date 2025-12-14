# Quick Start Guide - Dream Definers

## ✅ What's Already Set Up

- ✅ All backend API routes
- ✅ Authentication system (NextAuth)
- ✅ Email service (Resend)
- ✅ Database schema (Prisma)
- ✅ Blog system backend
- ✅ Form handlers with email notifications

## 🚀 Getting Started

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# Database (Required)
DATABASE_URL="postgresql://user:password@localhost:5432/dream_definers"

# NextAuth (Required)
AUTH_SECRET="your_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"

# Resend Email (Required for emails)
RESEND_API_KEY="re_your_api_key"
RESEND_FROM_EMAIL="your-verified@domain.com"
ADMIN_EMAIL="dreamdefinerstrainingacademy@gmail.com"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

**Generate AUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 2. Database Setup

```bash
# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 3. Create Admin User

Run this command and follow the prompts:

```bash
pnpm add ts-node -D
npx ts-node scripts/create-admin.ts
```

Or manually create in Prisma Studio with a bcrypt hashed password.

### 4. Seed Categories

```bash
npx ts-node scripts/seed-categories.ts
```

This creates:
- Aviation
- Effective Communication
- Pre-Placement Training

### 5. Start Development Server

```bash
pnpm dev
```

Visit: `http://localhost:3000`

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use test domain for development)
3. Get your API key
4. Add to `.env` file

**Test emails work without domain verification during development!**

## 🔐 Admin Access

1. Go to `/admin/login`
2. Use credentials created with the admin script
3. Access dashboard at `/admin/dashboard`

## 📝 Current Status

### ✅ Working Features
- Contact form (with email notifications)
- Consultancy form (with email notifications)
- All public pages (home, about, courses, services, etc.)
- Responsive design with hamburger menu
- SEO (sitemap, robots.txt, metadata)

### 🚧 Needs Frontend UI
The backend is complete, but these admin pages need UI:

1. **Admin Login** (`app/admin/login/page.tsx`)
2. **Admin Dashboard** (`app/admin/dashboard/page.tsx`)
3. **Blog Editor** (`components/admin/blog-editor.tsx`)
4. **Blog Form** (`components/admin/blog-form.tsx`)
5. **Public Blog List** (`app/blogs/page.tsx`)
6. **Blog Detail** (`app/blogs/[slug]/page.tsx`)

**All code is provided in `IMPLEMENTATION_GUIDE.md` - just copy and paste!**

## 🐛 Troubleshooting

### Prisma Error: "requires adapter"
**Fixed!** The Prisma client now handles this automatically.

### Cannot connect to database
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Test connection: `npx prisma db push`

### Email not sending
- Verify `RESEND_API_KEY` is correct
- Check Resend dashboard for verified domain
- Look at terminal logs for error messages

### Cannot login
- Ensure admin user was created
- Check password is correct
- Verify `AUTH_SECRET` is set in `.env`

## 📚 Documentation

- **README.md** - Main documentation
- **IMPLEMENTATION_GUIDE.md** - Frontend code examples
- **PRISMA_SETUP.md** - Database details
- **BLOG_SYSTEM_SETUP.md** - Blog system guide

## 🎯 Next Steps

1. ✅ Setup environment variables
2. ✅ Run database migrations
3. ✅ Create admin user
4. ✅ Seed categories
5. ⏳ Create admin frontend pages (use code from IMPLEMENTATION_GUIDE.md)
6. ⏳ Test blog creation
7. ⏳ Test email notifications

## 📞 Need Help?

Check the detailed guides:
- Database issues → `PRISMA_SETUP.md`
- Blog system → `BLOG_SYSTEM_SETUP.md`
- Frontend code → `IMPLEMENTATION_GUIDE.md`

---

**The backend is 100% ready. Just add the frontend pages and you're done!** 🎉

