# Complete Blog System Implementation Guide

## ✅ What's Already Done

### Backend & API (100% Complete)
- ✅ Prisma schema with User, Blog, Category, Newsletter models
- ✅ NextAuth v5 authentication with JWT
- ✅ Resend email integration with all templates
- ✅ Blog CRUD API routes (`/api/blogs`, `/api/blogs/[id]`)
- ✅ Category API routes (`/api/categories`)
- ✅ Newsletter subscription API (`/api/newsletter/subscribe`)
- ✅ Authentication APIs (forgot password, reset password)
- ✅ Protected routes middleware
- ✅ Email notifications for contact/consultancy forms
- ✅ Email notifications for new blog posts
- ✅ Password reset via email

### Database Models
```
User - Admin authentication
Blog - Blog posts with rich content
BlogCategory - Post categories
NewsletterSubscriber - Email subscribers
Contact - Contact form submissions
Consultancy - Consultancy form submissions
```

## 📝 Required Setup Steps

### 1. Environment Variables
Create `.env` file:
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

### 2. Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

### 3. Create Admin User
You need to create an admin user manually. Use this script:

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('your_secure_password', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@dreamdefiners.com',
      name: 'Admin',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Admin created:', admin.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run: `npx ts-node scripts/create-admin.ts`

### 4. Create Blog Categories
```typescript
// Run in Prisma Studio or create API call
await prisma.blogCategory.createMany({
  data: [
    { name: 'Aviation', slug: 'aviation' },
    { name: 'Effective Communication', slug: 'effective-communication' },
    { name: 'Pre-Placement Training', slug: 'pre-placement-training' },
  ],
});
```

## 🎨 Frontend Components to Create

I've set up all the backend. Here's what you need to build for the frontend:

### 1. Admin Login Page
**File:** `app/admin/login/page.tsx`

```typescript
'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-950 mb-6 text-center">
          Admin Login
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center mt-4 text-sm">
          <a href="/admin/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
}
```

### 2. Admin Dashboard
**File:** `app/admin/dashboard/page.tsx`

```typescript
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect('/admin/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-950 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <form action="/api/auth/signout" method="post">
            <button className="hover:underline">Logout</button>
          </form>
        </div>
      </nav>

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/blogs">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-blue-950">Blog Posts</h2>
              <p className="text-gray-600">Manage your blog posts</p>
            </div>
          </Link>

          <Link href="/admin/blogs/new">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-blue-950">New Post</h2>
              <p className="text-gray-600">Create a new blog post</p>
            </div>
          </Link>

          <Link href="/admin/categories">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-blue-950">Categories</h2>
              <p className="text-gray-600">Manage categories</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

### 3. Blog Editor Component (TipTap)
**File:** `components/admin/blog-editor.tsx`

```typescript
'use client'

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Link as LinkIcon } from 'lucide-react';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border-2 border-gray-300 rounded-md">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex gap-2 flex-wrap bg-gray-50">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${editor.isActive('bold') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <Bold size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${editor.isActive('italic') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <Italic size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${editor.isActive('underline') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <UnderlineIcon size={18} />
        </button>
        <div className="border-l border-gray-300 mx-2" />
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <ListOrdered size={18} />
        </button>
        <div className="border-l border-gray-300 mx-2" />
        <button
          onClick={() => {
            const url = prompt('Enter URL:');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          className={`p-2 rounded ${editor.isActive('link') ? 'bg-blue-200' : 'hover:bg-gray-200'}`}
        >
          <LinkIcon size={18} />
        </button>
      </div>

      {/* Editor */}
      <EditorContent 
        editor={editor} 
        className="prose max-w-none p-4 min-h-[400px] focus:outline-none"
      />
    </div>
  );
}
```

### 4. Blog Form Component
**File:** `components/admin/blog-form.tsx`

```typescript
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogEditor } from './blog-editor';
import { Button } from '@/components/ui/button';

interface BlogFormProps {
  blog?: any;
  categories: any[];
}

export function BlogForm({ blog, categories }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(blog?.content || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      excerpt: formData.get('excerpt'),
      content,
      categoryId: formData.get('categoryId'),
      published: formData.get('published') === 'on',
    };

    const url = blog ? `/api/blogs/${blog.id}` : '/api/blogs';
    const method = blog ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      router.push('/admin/blogs');
      router.refresh();
    } else {
      alert('Error saving blog');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-semibold mb-2">Title *</label>
        <input
          name="title"
          defaultValue={blog?.title}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Excerpt *</label>
        <textarea
          name="excerpt"
          defaultValue={blog?.excerpt}
          required
          rows={3}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Category *</label>
        <select
          name="categoryId"
          defaultValue={blog?.categoryId}
          required
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold mb-2">Content *</label>
        <BlogEditor content={content} onChange={setContent} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={blog?.published}
          id="published"
        />
        <label htmlFor="published">Publish immediately</label>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : blog ? 'Update' : 'Create'} Blog
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

### 5. Public Blog List Page
**File:** `app/blogs/page.tsx`

```typescript
import Link from 'next/link';

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?published=true`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function BlogsPage() {
  const { blogs } = await getBlogs();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-5xl font-bold text-blue-950 mb-12 text-center">
          Our Blog
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog: any) => (
            <Link key={blog.id} href={`/blogs/${blog.slug}`}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {blog.coverImage && (
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <span className="text-sm text-blue-600 font-semibold">
                    {blog.category.name}
                  </span>
                  <h2 className="text-2xl font-bold mt-2 mb-3">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {blog.excerpt}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 6. Blog Detail Page
**File:** `app/blogs/[slug]/page.tsx`

```typescript
import { notFound } from 'next/navigation';

async function getBlog(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/blogs?search=${slug}`,
    { cache: 'no-store' }
  );
  const { blogs } = await res.json();
  return blogs.find((b: any) => b.slug === slug);
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getBlog(params.slug);

  if (!blog || !blog.published) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <article className="container mx-auto max-w-4xl">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <span className="text-blue-600 font-semibold">
          {blog.category.name}
        </span>

        <h1 className="text-5xl font-bold text-blue-950 mt-4 mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>By {blog.author.name}</span>
          <span>•</span>
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.views} views</span>
        </div>

        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </article>
    </div>
  );
}
```

## 🚀 Next Steps

1. **Run Database Migration**: `npx prisma db push`
2. **Create Admin User**: Run the create-admin script
3. **Create Categories**: Use Prisma Studio or API
4. **Configure Resend**: Get API key and verify domain
5. **Test Authentication**: Login at `/admin/login`
6. **Create First Blog**: Go to `/admin/dashboard`
7. **Test Emails**: Submit forms and publish blogs

## 📧 Email Setup (Resend)

1. Sign up at https://resend.com
2. Verify your domain or use the test domain
3. Get your API key
4. Add to `.env` file

## 🔐 Security Checklist

- ✅ Passwords hashed with bcrypt
- ✅ JWT sessions with NextAuth
- ✅ Protected admin routes
- ✅ Input validation on all forms
- ✅ SQL injection protection (Prisma)
- ✅ CSRF protection (NextAuth)

## 🎉 You're Done!

The backend is 100% complete. Just create the frontend pages using the code above, and you'll have a fully functional blog system with admin panel, email notifications, and WYSIWYG editor!

