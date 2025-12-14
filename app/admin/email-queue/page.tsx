'use client'

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface EmailQueueItem {
  id: string;
  type: string;
  recipient: string;
  subject: string;
  status: string;
  retryCount: number;
  maxRetries: number;
  lastAttempt: string | null;
  nextRetryAt: string | null;
  errorMessage: string | null;
  sentAt: string | null;
  createdAt: string;
}

interface EmailQueueStats {
  pending: number;
  processing: number;
  sent: number;
  failed: number;
  total: number;
}

export default function EmailQueuePage() {
  const [emails, setEmails] = useState<EmailQueueItem[]>([]);
  const [stats, setStats] = useState<EmailQueueStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<{ status?: string; type?: string }>({});
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchEmails();
  }, [page, filter]);

  const fetchEmails = async () => {
    try {
      let url = `/api/admin/email-queue?page=${page}&limit=50`;
      if (filter.status) url += `&status=${filter.status}`;
      if (filter.type) url += `&type=${filter.type}`;

      const response = await fetch(url);
      const data = await response.json();
      setEmails(data.emails || []);
      setStats(data.stats);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching email queue:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/email-queue/${id}/retry`, {
        method: 'POST',
      });

      if (response.ok) {
        alert('Email queued for retry');
        fetchEmails();
      } else {
        alert('Failed to retry email');
      }
    } catch (error) {
      console.error('Error retrying email:', error);
      alert('Error retrying email');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'contact':
        return 'Contact Form';
      case 'consultancy':
        return 'Consultancy Form';
      case 'blog_notification':
        return 'Blog Notification';
      default:
        return type;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-950">Email Queue</h1>
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold text-blue-950">{stats.total}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Pending</div>
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Processing</div>
                <div className="text-2xl font-bold text-blue-600">{stats.processing}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Sent</div>
                <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Failed</div>
                <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="mb-6 flex gap-2 flex-wrap">
            <Button
              variant={!filter.status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, status: undefined })}
            >
              All Status
            </Button>
            <Button
              variant={filter.status === 'pending' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, status: 'pending' })}
            >
              Pending
            </Button>
            <Button
              variant={filter.status === 'failed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, status: 'failed' })}
            >
              Failed
            </Button>
            <Button
              variant={filter.status === 'sent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, status: 'sent' })}
            >
              Sent
            </Button>
            <div className="w-px bg-gray-300 mx-2" />
            <Button
              variant={!filter.type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, type: undefined })}
            >
              All Types
            </Button>
            <Button
              variant={filter.type === 'contact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, type: 'contact' })}
            >
              Contact
            </Button>
            <Button
              variant={filter.type === 'consultancy' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, type: 'consultancy' })}
            >
              Consultancy
            </Button>
            <Button
              variant={filter.type === 'blog_notification' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter({ ...filter, type: 'blog_notification' })}
            >
              Blog Notification
            </Button>
          </div>

          {/* Email List */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : emails.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No emails found</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Retries</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {emails.map((email) => (
                        <tr key={email.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{getTypeLabel(email.type)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{email.recipient}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">{email.subject}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(email.status)}`}>
                              {email.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {email.retryCount} / {email.maxRetries}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(email.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(email.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {email.status === 'failed' && email.retryCount < email.maxRetries && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRetry(email.id)}
                              >
                                Retry
                              </Button>
                            )}
                            {email.errorMessage && (
                              <button
                                onClick={() => alert(`Error: ${email.errorMessage}`)}
                                className="text-red-600 hover:text-red-900 ml-2"
                                title={email.errorMessage}
                              >
                                View Error
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="mt-6 flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm text-gray-600">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                    disabled={page === pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </ProtectedRoute>
  );
}

