import React from 'react'

interface Position {
  lat: string
  lng: string
}

interface MicrogridSubmission {
  id: string
  category: string
  microgridName: string
  description: string
  type: string
  operator: string
  state: string
  LGA: string
  geopoliticalZone: string
  capacity: string
  size: string
  powerSources: string
  commissioningDates: string
  position: Position
  source: string
  submittedAt: string
  status: string
}

interface ViewMicrogridSubmissionProps {
  submission: MicrogridSubmission
  onEdit: () => void
  onBack: () => void
  onAction: (id: string, action: 'approve' | 'reject' | 'delete') => void
}

export default function ViewMicrogridSubmission({
  submission,
  onEdit,
  onBack,
  onAction,
}: ViewMicrogridSubmissionProps) {
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
                  submission.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : submission.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {submission.status.charAt(0).toUpperCase() +
                  submission.status.slice(1)}
              </span>
              <span className="ml-2 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-800">
                {submission.category}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {submission.microgridName}
            </h1>
            <p className="mt-1 text-gray-600">{submission.description}</p>
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
              Basic Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{submission.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Operator</p>
                <p className="font-medium">{submission.operator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{submission.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">LGA</p>
                <p className="font-medium">{submission.LGA}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Geopolitical Zone</p>
                <p className="font-medium">{submission.geopoliticalZone}</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-5">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Technical Specifications
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-medium">{submission.capacity}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{submission.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Power Sources</p>
                <p className="font-medium">{submission.powerSources}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Commissioning Date</p>
                <p className="font-medium">{submission.commissioningDates}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-lg bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Location Information
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Coordinates</p>
              <p className="font-medium">
                Lat: {submission.position.lat}, Lng: {submission.position.lng}
              </p>
            </div>
            <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100">
              <p className="text-gray-500">
                Map visualization would appear here
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">
            Submission Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-gray-500">Source</p>
              <p className="font-medium">{submission.source}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Submitted At</p>
              <p className="font-medium">
                {new Date(submission.submittedAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
          <button
            onClick={() => onAction(submission.id, 'approve')}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Approve Submission
          </button>
          <button
            onClick={() => onAction(submission.id, 'reject')}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Reject Submission
          </button>
          <button
            onClick={() => onAction(submission.id, 'delete')}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Delete Submission
          </button>
        </div>
      </div>
    </div>
  )
}
