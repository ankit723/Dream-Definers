'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { useAuth } from '@/contexts/auth-context';
import { RichTextEditor } from '@/components/admin/rich-text-editor';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function EditBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    published: false,
    categoryId: '',
  });

  useEffect(() => {
    if (!blogId) {
      setLoading(false);
      alert('Invalid blog ID');
      router.push('/admin/blogs');
      return;
    }
    fetchBlog();
    fetchCategories();
  }, [blogId, router]);

  const fetchBlog = async () => {
    if (!blogId) return;
    
    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        alert(errorData.error || 'Blog not found');
        router.push('/admin/blogs');
        return;
      }
      
      const data = await response.json();
      
      if (data) {
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          coverImage: data.coverImage || '',
          published: data.published || false,
          categoryId: data.categoryId || data.category?.id || '',
        });
      } else {
        alert('Blog not found');
        router.push('/admin/blogs');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      alert('Error loading blog. Please try again.');
      router.push('/admin/blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.slug || !formData.excerpt || !formData.content || !formData.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    if (!blogId) {
      alert('Invalid blog ID');
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/blogs');
      } else {
        alert(data.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Error updating blog');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-950 border-r-transparent"></div>
            <p className="mt-4 text-blue-950 font-semibold">Loading...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-950">Edit Blog</h1>
              <Link href="/admin/blogs">
                <Button variant="outline" size="sm">Back to Blogs</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Excerpt <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Cover Image
                </label>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="coverImageUpload"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      // Validate file size (5MB max)
                      if (file.size > 5 * 1024 * 1024) {
                        alert('Image size must be less than 5MB');
                        return;
                      }

                      try {
                        const uploadFormData = new FormData();
                        uploadFormData.append('file', file);

                        const response = await fetch('/api/admin/upload', {
                          method: 'POST',
                          body: uploadFormData,
                        });

                        const data = await response.json();

                        if (response.ok && data.url) {
                          setFormData((prev) => ({ ...prev, coverImage: data.url }));
                        } else {
                          alert(data.error || 'Failed to upload image');
                        }
                      } catch (error) {
                        console.error('Error uploading image:', error);
                        alert('Error uploading image. Please try again.');
                      }
                    }}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('coverImageUpload')?.click()}
                    >
                      Upload Cover Image
                    </Button>
                    {formData.coverImage && (
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-sm text-gray-600 truncate">{formData.coverImage}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setFormData({ ...formData, coverImage: '' })}
                        >
                          Clear
                        </Button>
                      </div>
                    )}
                  </div>
                  {formData.coverImage && (
                    <div className="mt-2">
                      <img
                        src={formData.coverImage}
                        alt="Cover preview"
                        className="max-w-xs h-auto rounded-lg border-2 border-gray-300"
                      />
                    </div>
                  )}
                  <input
                    type="url"
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="Or enter image URL"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-semibold text-blue-950 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <RichTextEditor
                  content={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                />
              </div>

              {/* Published */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 text-blue-950 border-gray-300 rounded focus:ring-blue-950"
                />
                <label htmlFor="published" className="text-sm font-semibold text-blue-950">
                  Published
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Link href="/admin/blogs">
                <Button type="button" variant="outline">Cancel</Button>
              </Link>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  );
}

