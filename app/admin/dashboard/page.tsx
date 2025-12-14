'use client'

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    totalCategories: 0,
    totalContacts: 0,
    totalConsultancies: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [blogsRes, categoriesRes, contactsRes, consultanciesRes] = await Promise.all([
        fetch('/api/admin/blogs?limit=1000'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/contacts?limit=1'),
        fetch('/api/admin/consultancies?limit=1'),
      ]);

      const blogsData = await blogsRes.json();
      const categoriesData = await categoriesRes.json();
      const contactsData = await contactsRes.json();
      const consultanciesData = await consultanciesRes.json();

      const published = blogsData.blogs?.filter((b: any) => b.published).length || 0;
      const drafts = blogsData.blogs?.filter((b: any) => !b.published).length || 0;

      setStats({
        totalBlogs: blogsData.blogs?.length || 0,
        publishedBlogs: published,
        draftBlogs: drafts,
        totalCategories: categoriesData.length || 0,
        totalContacts: contactsData.pagination?.total || 0,
        totalConsultancies: consultanciesData.pagination?.total || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className=" mt-20 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-950">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <Button onClick={logout} variant="outline" size="sm">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Total Blogs</h3>
                <p className="text-3xl font-bold text-blue-950 mt-2">{stats.totalBlogs}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Published</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats.publishedBlogs}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Drafts</h3>
                <p className="text-3xl font-bold text-yellow-600 mt-2">{stats.draftBlogs}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Categories</h3>
                <p className="text-3xl font-bold text-blue-950 mt-2">{stats.totalCategories}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Contacts</h3>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalContacts}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Consultancies</h3>
                <p className="text-3xl font-bold text-indigo-600 mt-2">{stats.totalConsultancies}</p>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/blogs">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Manage Blogs</h3>
                <p className="text-sm text-gray-600">Create, edit, and publish blog posts</p>
              </div>
            </Link>
            <Link href="/admin/blogs/new">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Create New Blog</h3>
                <p className="text-sm text-gray-600">Write a new blog post</p>
              </div>
            </Link>
            <Link href="/admin/categories">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Manage Categories</h3>
                <p className="text-sm text-gray-600">Organize your blog categories</p>
              </div>
            </Link>
            <Link href="/admin/contact-results">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Contact Results</h3>
                <p className="text-sm text-gray-600">View contact form submissions</p>
              </div>
            </Link>
            <Link href="/admin/consultancy-results">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Consultancy Results</h3>
                <p className="text-sm text-gray-600">View consultancy form submissions</p>
              </div>
            </Link>
            <Link href="/admin/create-admin">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Create Admin</h3>
                <p className="text-sm text-gray-600">Create a new admin account</p>
              </div>
            </Link>
            <Link href="/admin/admins">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-950 mb-2">Manage Admins</h3>
                <p className="text-sm text-gray-600">View and manage admin accounts</p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

