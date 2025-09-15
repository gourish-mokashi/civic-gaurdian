import { useState } from 'react'
import { mockIssues } from '../data/mockIssues'
import Badge from '../components/Badge'
import IssueDetailModal from '../components/IssueDetailModal'

export default function IssueManagement() {
  const [issues, _setIssues] = useState(mockIssues)
  const [filters, setFilters] = useState({ status: 'All', category: 'All' })
  const [selectedIssue, setSelectedIssue] = useState(null)

  const statusOptions = ['All', 'New', 'In Progress', 'Resolved']
  const categoryOptions = ['All', ...Array.from(new Set(issues.map((i) => i.category)))]

  const visibleIssues = issues.filter((i) => {
    const statusMatch = filters.status === 'All' || i.status === filters.status
    const categoryMatch = filters.category === 'All' || i.category === filters.category
    return statusMatch && categoryMatch
  })

  // badge styling moved to reusable Badge component

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Issue Management</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="w-full sm:w-60">
          <label className="block text-sm font-medium text-gray-700">Filter by Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-72">
          <label className="block text-sm font-medium text-gray-700">Filter by Category</label>
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Issues table */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="text-base font-medium text-gray-900">Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Case ID</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Category</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Location</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Date</th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Status</th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {visibleIssues.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">No issues found for selected filters.</td>
                </tr>
              ) : (
                visibleIssues.map((i) => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{i.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{i.category}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{i.location}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{i.reportedDate}</td>
                    <td className="px-4 py-3 text-sm"><Badge status={i.status} /></td>
                    <td className="px-4 py-3 text-sm text-right">
                      <button
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        onClick={() => setSelectedIssue(i)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue details modal */}
      <IssueDetailModal issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
    </div>
  )
}
