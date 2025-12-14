'use client'

import { useEffect, useState } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Consultancy {
  id: string;
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string | null;
  createdAt: string;
}

const PROGRAMS = ['Aviation', 'Effective Communication', 'Pre-Placement Training'];

export default function ConsultancyResultsPage() {
  const { user } = useAuth();
  const [consultancies, setConsultancies] = useState<Consultancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchConsultancies();
  }, [page, search, programFilter]);

  const fetchConsultancies = async () => {
    try {
      let url = `/api/admin/consultancies?page=${page}&limit=20`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (programFilter) url += `&program=${encodeURIComponent(programFilter)}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setConsultancies(data.consultancies || []);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching consultancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchConsultancies();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consultancy request?')) return;

    try {
      const response = await fetch(`/api/admin/consultancies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchConsultancies();
      } else {
        alert('Failed to delete consultancy request');
      }
    } catch (error) {
      console.error('Error deleting consultancy:', error);
      alert('Error deleting consultancy request');
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-blue-950">Consultancy Form Results</h1>
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-6 space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, phone, or message..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
              />
              <Button type="submit" size="sm">Search</Button>
              {(search || programFilter) && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearch('');
                    setProgramFilter('');
                    setPage(1);
                  }}
                >
                  Clear
                </Button>
              )}
            </form>
            
            {/* Program Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={programFilter === '' ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setProgramFilter('');
                  setPage(1);
                }}
              >
                All Programs
              </Button>
              {PROGRAMS.map((program) => (
                <Button
                  key={program}
                  variant={programFilter === program ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setProgramFilter(program);
                    setPage(1);
                  }}
                >
                  {program}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : consultancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No consultancy requests found</p>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Program
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {consultancies.map((consultancy) => (
                        <tr key={consultancy.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{consultancy.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href={`mailto:${consultancy.email}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {consultancy.email}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <a
                              href={`tel:${consultancy.phone}`}
                              className="text-sm text-gray-900 hover:underline"
                            >
                              {consultancy.phone}
                            </a>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {consultancy.program}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {consultancy.message ? (
                              <div className="text-sm text-gray-900 max-w-xs truncate">
                                {consultancy.message}
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400 italic">No message</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {new Date(consultancy.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(consultancy.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {consultancy.message && (
                              <button
                                onClick={() => {
                                  alert(`Full Message:\n\n${consultancy.message}`);
                                }}
                                className="text-blue-600 hover:text-blue-900 mr-4"
                              >
                                View
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(consultancy.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
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

