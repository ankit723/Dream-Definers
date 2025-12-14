'use client'

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, User, Mail, Calendar, Edit, X, Save } from 'lucide-react';

interface Admin {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  _count?: {
    blogs: number;
  };
}

export default function AdminManagementPage() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('/api/admin/admins');
      const data = await response.json();

      if (response.ok) {
        setAdmins(data.admins || []);
      } else {
        setError(data.error || 'Failed to fetch admins');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
      setError('Failed to load admins');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Name, email, and password are required');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!currentUser?.id) {
      setError('You must be logged in to create an admin');
      return;
    }

    try {
      const response = await fetch('/api/admin/create-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userId: currentUser.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Admin created successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setShowCreateForm(false);
        fetchAdmins();
      } else {
        setError(data.error || 'Failed to create admin');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };

  const handleEdit = (admin: Admin) => {
    setEditingId(admin.id);
    setEditFormData({
      name: admin.name,
      email: admin.email,
      password: '',
      confirmPassword: '',
    });
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (adminId: string) => {
    setError('');
    setSuccess('');

    if (!editFormData.name || !editFormData.email) {
      setError('Name and email are required');
      return;
    }

    // If password is provided, validate it
    if (editFormData.password) {
      if (editFormData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return;
      }

      if (editFormData.password !== editFormData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }

    if (!currentUser?.id) {
      setError('You must be logged in to update an admin');
      return;
    }

    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editFormData.name,
          email: editFormData.email,
          password: editFormData.password || undefined,
          userId: currentUser.id,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Admin updated successfully!');
        setEditingId(null);
        setEditFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        fetchAdmins();
      } else {
        setError(data.error || 'Failed to update admin');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setError('');
  };

  const handleDelete = async (adminId: string, adminEmail: string) => {
    // Prevent deleting yourself
    if (adminId === currentUser?.id) {
      alert('You cannot delete your own account');
      return;
    }

    if (!confirm(`Are you sure you want to delete admin "${adminEmail}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/admins/${adminId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Admin deleted successfully!');
        fetchAdmins();
      } else {
        setError(data.error || 'Failed to delete admin');
      }
    } catch (error) {
      console.error('Error deleting admin:', error);
      setError('Error deleting admin');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-950">Admin Management</h1>
              <div className="flex gap-4">
                <Link href="/admin/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
                <Button
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(!showCreateForm);
                    setError('');
                    setSuccess('');
                  }}
                  className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900"
                >
                  <Plus className="h-4 w-4" />
                  {showCreateForm ? 'Cancel Create' : 'Create Admin'}
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Actions */}
          <div className="mb-6 bg-white rounded-lg shadow p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-blue-950 mb-1">Quick Actions</h2>
                <p className="text-sm text-gray-600">Create new admins or manage existing ones</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(!showCreateForm);
                    setError('');
                    setSuccess('');
                  }}
                  className="flex items-center gap-2 bg-blue-950 hover:bg-blue-900"
                >
                  <Plus className="h-4 w-4" />
                  {showCreateForm ? 'Cancel Create' : 'Create Admin'}
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-500 rounded-md p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border-2 border-green-500 rounded-md p-4">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Create Admin Form */}
          {showCreateForm && (
            <div className="mb-8 bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-blue-950">Create New Admin</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowCreateForm(false);
                    setFormData({
                      name: '',
                      email: '',
                      password: '',
                      confirmPassword: '',
                    });
                    setError('');
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="admin@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="••••••••"
                  />
                  <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    minLength={8}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setFormData({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                      });
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-950 hover:bg-blue-900">
                    Create Admin
                  </Button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : admins.length === 0 && !showCreateForm ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No admins found</p>
              <Button onClick={() => setShowCreateForm(true)}>Create First Admin</Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Admin
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blogs Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created At
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50">
                        {editingId === admin.id ? (
                          <>
                            <td className="px-6 py-4" colSpan={5}>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-xs font-semibold text-blue-950 mb-1">
                                      Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      value={editFormData.name}
                                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-blue-950 mb-1">
                                      Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="email"
                                      value={editFormData.email}
                                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-blue-950 mb-1">
                                      New Password (leave blank to keep current)
                                    </label>
                                    <input
                                      type="password"
                                      value={editFormData.password}
                                      onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm"
                                      placeholder="••••••••"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Min 8 characters</p>
                                  </div>
                                  <div>
                                    <label className="block text-xs font-semibold text-blue-950 mb-1">
                                      Confirm Password
                                    </label>
                                    <input
                                      type="password"
                                      value={editFormData.confirmPassword}
                                      onChange={(e) => setEditFormData({ ...editFormData, confirmPassword: e.target.value })}
                                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm"
                                      placeholder="••••••••"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleCancelEdit}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleUpdate(admin.id)}
                                    className="bg-blue-950 hover:bg-blue-900"
                                  >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save Changes
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-blue-950" />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                  {admin.id === currentUser?.id && (
                                    <div className="text-xs text-blue-600 font-semibold">(You)</div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-900">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                {admin.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                {admin._count?.blogs || 0} blog{admin._count?.blogs !== 1 ? 's' : ''}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                                {new Date(admin.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEdit(admin)}
                                  className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Edit
                                </Button>
                                {admin.id !== currentUser?.id && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDelete(admin.id, admin.email)}
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                )}
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Stats Summary */}
          {admins.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Total Admins</h3>
                <p className="text-3xl font-bold text-blue-950 mt-2">{admins.length}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Total Blogs</h3>
                <p className="text-3xl font-bold text-blue-950 mt-2">
                  {admins.reduce((sum, admin) => sum + (admin._count?.blogs || 0), 0)}
                </p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-sm font-medium text-gray-600">Active Admins</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{admins.length}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

