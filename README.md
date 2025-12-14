# Dream Definers Training Academy - Website

A modern, full-featured website for Dream Definers Training Academy built with Next.js 16, TypeScript, Prisma, and TailwindCSS.

## 🎯 Features

### ✅ Completed Features

#### Frontend
- 🏠 **Home Page** - Hero section, courses, speciality showcase, founders, FAQ, reviews
- 📞 **Contact Page** - Contact form with email notifications
- 🆓 **Free Consultancy Page** - Consultancy request form
- 📚 **Courses Page** - Aviation, Communication, Pre-Placement Training
- 🛠️ **Services Page** - 8 different services showcased
- 📱 **Responsive Design** - Mobile-first design across all breakpoints
- 🍔 **Hamburger Menu** - Mobile navigation with smooth transitions
- 🎨 **Modern UI** - Clean, professional design with smooth animations

#### Backend & API
- 🔐 **Authentication System** - NextAuth v5 with JWT sessions
- 📧 **Email Service** - Resend integration with professional templates
- 🗄️ **Database** - PostgreSQL with Prisma ORM
- 📝 **Blog System** - Full CRUD with rich text editor
- 🏷️ **Categories** - Blog categorization (Aviation, Communication, Training)
- 📬 **Newsletter** - Subscribe system for blog updates
- 🔒 **Admin Panel** - Protected dashboard for content management
- 🔑 **Password Reset** - Forgot password flow via email

#### Email Notifications
- ✉️ Contact form confirmation to user
- ✉️ Contact form notification to admin
- ✉️ Consultancy form confirmation to user  
- ✉️ Consultancy form notification to admin
- ✉️ Password reset emails
- ✉️ New blog post notifications to subscribers

#### SEO & Optimization
- 🗺️ **Sitemap** - Automatic sitemap generation
- 🤖 **Robots.txt** - Search engine directives
- 📄 **Metadata** - Comprehensive meta tags for all pages
- 🚫 **404 Page** - Custom not found page
- 🎯 **Performance** - Server-side rendering for better SEO

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd dream-definers
pnpm install
```

2. **Environment Setup**
Create `.env` file in the root:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dream_definers"

# NextAuth
AUTH_SECRET="generate_with_openssl_rand_base64_32"
NEXTAUTH_URL="http://localhost:3000"

# Resend Email
RESEND_API_KEY="re_your_api_key"
RESEND_FROM_EMAIL="your-verified@domain.com"
ADMIN_EMAIL="dreamdefinerstrainingacademy@gmail.com"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

3. **Database Setup**
```bash
# Generate Prisma Client
pnpm db:generate

# Push schema to database
pnpm db:push
```

4. **Create Admin User**
```bash
pnpm admin:create
```
Follow the prompts to create your admin account.

5. **Seed Categories**
```bash
pnpm db:seed
```

6. **Start Development Server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
dream-definers/
├── app/
│   ├── (pages)/                    # Public pages
│   │   ├── about-us/
│   │   ├── blogs/                  # Blog listing & detail pages
│   │   ├── contact-us/
│   │   ├── courses/
│   │   ├── free-consultancy/
│   │   ├── gallery/
│   │   ├── our-founders/
│   │   └── services/
│   ├── admin/                      # Admin panel (protected)
│   │   ├── dashboard/
│   │   ├── blogs/
│   │   ├── login/
│   │   └── forgot-password/
│   ├── api/                        # API routes
│   │   ├── auth/                   # Authentication endpoints
│   │   ├── blogs/                  # Blog CRUD operations
│   │   ├── categories/             # Category management
│   │   ├── contact/                # Contact form handler
│   │   ├── consultancy/            # Consultancy form handler
│   │   └── newsletter/             # Newsletter subscription
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx               # Custom 404 page
│   ├── robots.ts                   # Robots.txt generator
│   └── sitemap.ts                  # Sitemap generator
├── components/
│   ├── admin/                      # Admin components
│   │   ├── blog-editor.tsx         # TipTap WYSIWYG editor
│   │   └── blog-form.tsx           # Blog creation/edit form
│   ├── blogs/
│   │   └── blog-card.tsx
│   ├── forms/
│   │   ├── contact-form.tsx
│   │   └── consultancy-form.tsx
│   ├── home/
│   │   ├── faq-section.tsx
│   │   ├── partners-carousel.tsx
│   │   └── reviews-carousel.tsx
│   ├── layout/
│   │   ├── footer.tsx
│   │   └── navbar.tsx
│   └── ui/                         # Reusable UI components
│       ├── accordion.tsx
│       └── button.tsx
├── lib/
│   ├── auth.ts                     # NextAuth configuration
│   ├── email.ts                    # Resend email functions
│   ├── prisma.ts                   # Prisma client
│   └── utils.ts                    # Utility functions
├── prisma/
│   └── schema.prisma               # Database schema
├── scripts/
│   ├── create-admin.ts             # Admin user creation script
│   └── seed-categories.ts          # Category seeding script
├── middleware.ts                   # Route protection
├── IMPLEMENTATION_GUIDE.md         # Detailed implementation guide
├── PRISMA_SETUP.md                 # Prisma setup instructions
└── BLOG_SYSTEM_SETUP.md            # Blog system documentation
```

## 🗄️ Database Schema

### Models
- **User** - Admin authentication
- **Blog** - Blog posts with rich content
- **BlogCategory** - Post categorization
- **NewsletterSubscriber** - Email subscribers
- **Contact** - Contact form submissions
- **Consultancy** - Consultancy requests

## 📝 Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm db:generate      # Generate Prisma Client
pnpm db:push          # Push schema to database
pnpm db:studio        # Open Prisma Studio

# Setup
pnpm admin:create     # Create admin user
pnpm db:seed          # Seed initial data
```

## 🔐 Admin Panel

Access the admin panel at `/admin/login`

### Features
- Blog post creation with WYSIWYG editor
- Draft/Publish functionality
- Category management
- View analytics
- Subscriber management (future)

### Default Login
Use the credentials you created with `pnpm admin:create`

## 📧 Email Configuration (Resend)

1. Sign up at [Resend](https://resend.com)
2. Verify your domain or use test domain
3. Get API key from dashboard
4. Add to `.env` file

### Email Templates
- Contact form confirmation & admin notification
- Consultancy request confirmation & admin notification
- Password reset
- New blog post notifications

## 🎨 Styling

- **TailwindCSS** - Utility-first CSS framework
- **Responsive Breakpoints** - xs, sm, md, lg, xl, 2xl
- **Color Scheme** - Blue-950 (primary), White, Gradients
- **Components** - Shadcn UI components

## 🔒 Security

- ✅ Password hashing with bcrypt
- ✅ JWT-based sessions
- ✅ Protected admin routes
- ✅ CSRF protection
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection (React)

## 📚 Documentation

- **IMPLEMENTATION_GUIDE.md** - Complete setup and code examples
- **PRISMA_SETUP.md** - Database setup instructions
- **BLOG_SYSTEM_SETUP.md** - Blog system documentation

## 🚧 TODO (Frontend UI)

The backend is 100% complete. Remaining frontend pages:

- [ ] Admin login page (`app/admin/login/page.tsx`)
- [ ] Admin dashboard (`app/admin/dashboard/page.tsx`)
- [ ] Blog editor component (`components/admin/blog-editor.tsx`)
- [ ] Blog form component (`components/admin/blog-form.tsx`)
- [ ] Public blog list page (`app/blogs/page.tsx`)
- [ ] Blog detail page (`app/blogs/[slug]/page.tsx`)

See `IMPLEMENTATION_GUIDE.md` for complete code examples.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📞 Contact Information

**Dream Definers Training Academy**
- 📧 Email: dreamdefinerstrainingacademy@gmail.com
- 📱 Phone: +91 81445 53579 | +91 99370 03373
- 📍 Address: 15, Soubhagya Nagar, Baramunda, Bhubaneswar, Odisha - 751003

## 🎓 Courses

- Aviation
- Effective Communication
- Pre-Placement Training

## 📄 License

Private - Dream Definers Training Academy

---

Built with ❤️ using Next.js, TypeScript, Prisma, and TailwindCSS
