'use client'

import { useState, useEffect } from 'react';
import { X, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface BlogViewModalProps {
  blogId: string;
  isOpen: boolean;
  onClose: () => void;
}

interface BlogStats {
  views: number;
  likes: number;
  comments: number;
  topLevelComments: number;
  shares: number;
}

interface BlogData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  views: number;
  createdAt: string;
  publishedAt: string | null;
  author: {
    name: string;
  };
  category: {
    name: string;
    slug: string;
  };
}

export function BlogViewModal({ blogId, isOpen, onClose }: BlogViewModalProps) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [stats, setStats] = useState<BlogStats | null>(null);

  useEffect(() => {
    if (isOpen && blogId) {
      fetchBlogData();
    }
  }, [isOpen, blogId]);

  const fetchBlogData = async () => {
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}/stats`);
      const data = await response.json();

      if (response.ok) {
        setBlog(data.blog);
        setStats(data.stats);
      } else {
        alert('Failed to load blog data');
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
      alert('Error loading blog data');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-950">Blog Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : blog && stats ? (
            <div className="space-y-6">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Eye className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-950">{stats.views}</div>
                  <div className="text-xs text-gray-500">Views</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Heart className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-bold text-red-600">{stats.likes}</div>
                  <div className="text-xs text-gray-500">Likes</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{stats.comments}</div>
                  <div className="text-xs text-gray-500">Comments</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                    <Share2 className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">{stats.shares}</div>
                  <div className="text-xs text-gray-500">Shares</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.topLevelComments}</div>
                  <div className="text-xs text-gray-500">Top Comments</div>
                </div>
              </div>

              {/* Blog Info */}
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded">
                    {blog.category.name}
                  </span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded ${
                    blog.published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <h1 className="text-3xl font-bold text-blue-950 mb-2">{blog.title}</h1>
                <p className="text-gray-600 mb-2">{blog.excerpt}</p>
                <div className="text-sm text-gray-500">
                  By {blog.author.name} • {new Date(blog.createdAt).toLocaleDateString()}
                  {blog.publishedAt && ` • Published: ${new Date(blog.publishedAt).toLocaleDateString()}`}
                </div>
              </div>

              {/* Cover Image */}
              {blog.coverImage && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="prose prose-lg max-w-none prose-headings:text-blue-950 prose-a:text-blue-600 prose-strong:text-blue-950">
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              </div>

              {/* Footer */}
              <div className="pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p><strong>Slug:</strong> {blog.slug}</p>
                  <p><strong>URL:</strong> /blogs/{blog.slug}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">Blog not found</div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

