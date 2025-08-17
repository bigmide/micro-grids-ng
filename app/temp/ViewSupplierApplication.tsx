// File: src/components/ViewSupplierApplication.tsx
import React from 'react'

interface SupplierApplication {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  location: string
  website: string
  description: string
  products: string
  coverage: string[]
  certifications: string
  yearsExperience: string
  submittedAt: string
  status: string
}

interface ViewSupplierApplicationProps {
  application: SupplierApplication
  onEdit: () => void
  onBack: () => void
  onAction: (id: string, action: 'approve' | 'reject' | 'delete') => void
}

export default function ViewSupplierApplication({
  application,
  onEdit,
  onBack,
  onAction,
}: ViewSupplierApplicationProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center font-medium text-teal-600 hover:text-teal-800"
        >
          <svg
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to list
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2">
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                  application.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {application.status.charAt(0).toUpperCase() +
                  application.status.slice(1)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {application.companyName}
            </h1>
            <p className="mt-1 text-gray-600">{application.description}</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-lg bg-gray-50 p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Company Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Contact Person</p>
                <p className="font-medium">{application.contactName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{application.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Website</p>
                <p className="font-medium">{application.website}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{application.location}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Business Details
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Years of Experience</p>
                <p className="font-medium">{application.yearsExperience}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Certifications</p>
                <p className="font-medium">{application.certifications}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Coverage Areas</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {application.coverage.map((area, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-teal-100 px-2 py-1 text-xs text-teal-800"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Products & Services
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="font-medium">Offered Products/Services:</p>
              <p className="mt-1">{application.products}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Submission Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Submitted At</p>
              <p className="font-medium">
                {new Date(application.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
          <button
            onClick={() => onAction(application.id, 'approve')}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Approve Application
          </button>
          <button
            onClick={() => onAction(application.id, 'reject')}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Reject Application
          </button>
          <button
            onClick={() => onAction(application.id, 'delete')}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  )
}
