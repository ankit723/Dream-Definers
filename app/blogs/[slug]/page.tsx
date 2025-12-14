import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogInteractions } from "@/components/blogs/blog-interactions";

async function getBlog(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs/${slug}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [blog.coverImage] : [],
      url: `/blogs/${blog.slug}`,
    },
    alternates: {
      canonical: `/blogs/${blog.slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <article className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <Link href="/blogs" className="inline-flex items-center text-blue-950 hover:text-blue-800 mb-8">
          <span className="mr-2">←</span> Back to Blogs
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-blue-950 bg-blue-100 px-3 py-1 rounded">
              {blog.category.name}
            </span>
            <span className="text-sm text-gray-600">
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-950 mb-4">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>By {blog.author.name}</span>
            <span>•</span>
            <span>{blog.views} views</span>
          </div>
        </header>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 sm:p-12">
          <div
            className="prose prose-lg max-w-none prose-headings:text-blue-950 prose-a:text-blue-600 prose-strong:text-blue-950"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Interactions */}
        <BlogInteractions slug={blog.slug} />

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Category</p>
              <Link
                href={`/blogs?category=${blog.category.slug}`}
                className="text-blue-950 font-semibold hover:underline"
              >
                {blog.category.name}
              </Link>
            </div>
            <Link href="/blogs">
              <button className="px-6 py-2 bg-blue-950 text-white rounded-md hover:bg-blue-900 transition-colors">
                View All Blogs
              </button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

