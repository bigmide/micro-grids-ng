// File: src/components/EditMicrogridSubmission.tsx
import React, { useState } from 'react'

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

interface EditMicrogridSubmissionProps {
  submission: MicrogridSubmission
  onSave: (updatedData: MicrogridSubmission) => void
  onCancel: () => void
}

const categories = [
  'Existing Microgrids',
  'Developing Microgrids',
  'Potential Microgrids',
  'Failed Microgrids',
]

const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const geopoliticalZones = [
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
]

const powerSourceOptions = [
  'Solar',
  'Diesel',
  'Wind',
  'Hydro',
  'Biomass',
  'Natural Gas',
  'Battery Storage',
  'Hybrid (Solar/Diesel)',
  'Hybrid (Wind/Solar)',
  'Hybrid (Solar/Tidal)',
  'Hybrid (Solar/Gas)',
]

export default function EditMicrogridSubmission({
  submission,
  onSave,
  onCancel,
}: EditMicrogridSubmissionProps) {
  const [formData, setFormData] = useState(submission)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target

    if (name === 'lat' || name === 'lng') {
      setFormData((prev) => ({
        ...prev,
        position: {
          ...prev.position,
          [name]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.microgridName.trim())
      newErrors.microgridName = 'Microgrid name is required'
    if (!formData.description.trim())
      newErrors.description = 'Description is required'
    if (!formData.type.trim()) newErrors.type = 'Type is required'
    if (!formData.operator.trim()) newErrors.operator = 'Operator is required'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.LGA.trim()) newErrors.LGA = 'LGA is required'
    if (!formData.geopoliticalZone)
      newErrors.geopoliticalZone = 'Geopolitical zone is required'
    if (!formData.capacity.trim()) newErrors.capacity = 'Capacity is required'
    if (!formData.powerSources)
      newErrors.powerSources = 'Power sources are required'
    if (!formData.commissioningDates.trim())
      newErrors.commissioningDates = 'Commissioning date is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6">
        <button
          onClick={onCancel}
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
          Back to details
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Edit Microgrid Submission
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Microgrid Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="microgridName"
                  value={formData.microgridName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.microgridName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.microgridName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.microgridName}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full border px-3 py-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Type <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Operator <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="operator"
                  value={formData.operator}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.operator ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.operator && (
                  <p className="mt-1 text-sm text-red-500">{errors.operator}</p>
                )}
              </div>
            </div>

            <div>
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                >
                  <option value="">Select a state</option>
                  {nigerianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  LGA (Local Government Area){' '}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="LGA"
                  value={formData.LGA}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.LGA ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.LGA && (
                  <p className="mt-1 text-sm text-red-500">{errors.LGA}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Geopolitical Zone <span className="text-red-500">*</span>
                </label>
                <select
                  name="geopoliticalZone"
                  value={formData.geopoliticalZone}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.geopoliticalZone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                >
                  <option value="">Select a zone</option>
                  {geopoliticalZones.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
                {errors.geopoliticalZone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.geopoliticalZone}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.capacity && (
                  <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Power Sources <span className="text-red-500">*</span>
                </label>
                <select
                  name="powerSources"
                  value={formData.powerSources}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.powerSources ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                >
                  <option value="">Select power sources</option>
                  {powerSourceOptions.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
                {errors.powerSources && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.powerSources}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Location Information
              </h2>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Coordinates
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      name="lat"
                      value={formData.position.lat}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Latitude"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lng"
                      value={formData.position.lng}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                      placeholder="Longitude"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Additional Information
              </h2>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Commissioning Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="commissioningDates"
                  value={formData.commissioningDates}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.commissioningDates ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.commissioningDates && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.commissioningDates}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-teal-600 px-6 py-2 font-medium text-white hover:bg-teal-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
