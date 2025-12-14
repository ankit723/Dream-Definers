import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Force dynamic rendering since we're fetching fresh data
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read our latest blog posts about soft skills training, communication, aviation, and career development.",
  keywords: [
    "blog",
    "soft skills",
    "communication",
    "aviation training",
    "career development",
  ],
  openGraph: {
    title: "Blogs - Dream Definers",
    description: "Read our latest blog posts about training and career development.",
    url: "/blogs",
  },
  alternates: {
    canonical: "/blogs",
  },
};

async function getBlogs() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?limit=12`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });
    
    if (!response.ok) {
      return { blogs: [], pagination: null };
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], pagination: null };
  }
}

async function getCategories() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/admin/categories`, {
      next: { revalidate: 3600 }, // Revalidate every hour (categories don't change often)
    });
    
    if (!response.ok) {
      return [];
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export default async function BlogsPage() {
  const { blogs, pagination } = await getBlogs();
  const categories = await getCategories();

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-950 mb-4">
            Our Blog
          </h1>
          <p className="text-lg text-blue-900/80 max-w-2xl mx-auto">
            Stay updated with the latest insights on soft skills, communication, aviation training, and career development.
          </p>
        </div>

        {/* Categories Filter */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2 justify-center">
            <Link href="/blogs">
              <Button variant="outline" size="sm">All</Button>
            </Link>
            {categories.map((category: any) => (
              <Link key={category.id} href={`/blogs?category=${category.slug}`}>
                <Button variant="outline" size="sm">{category.name}</Button>
              </Link>
            ))}
          </div>
        )}

        {/* Blog Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">No blog posts available yet.</p>
            <p className="text-gray-500">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog: any) => (
              <Link
                key={blog.id}
                href={`/blogs/${blog.slug}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {blog.coverImage && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-blue-950 bg-blue-100 px-2 py-1 rounded">
                      {blog.category.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-blue-950 mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>By {blog.author.name}</span>
                    <span>{blog.views} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Link key={page} href={`/blogs?page=${page}`}>
                <Button
                  variant={page === pagination.page ? 'default' : 'outline'}
                  size="sm"
                >
                  {page}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
