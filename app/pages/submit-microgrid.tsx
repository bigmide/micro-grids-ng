/*global React */

import { useState } from 'react'
import { useNavigate } from 'react-router'

interface Position {
  lat: string
  lng: string
}

interface MicrogridFormData {
  category:
    | 'Existing Microgrids'
    | 'Developing Microgrids'
    | 'Potential Microgrids'
    | 'Failed Microgrids'
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
}

const geopoliticalZones = [
  'North Central',
  'North East',
  'North West',
  'South East',
  'South South',
  'South West',
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

export function SubmitMicrogridView() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<MicrogridFormData>({
    category: 'Existing Microgrids',
    microgridName: '',
    description: '',
    type: '',
    operator: '',
    state: '',
    LGA: '',
    geopoliticalZone: '',
    capacity: '',
    size: '',
    powerSources: '',
    commissioningDates: '',
    position: { lat: '', lng: '' },
    source: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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

    if (!formData.microgridName.trim()) {
      newErrors.microgridName = 'Microgrid name is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Type is required'
    }

    if (!formData.operator.trim()) {
      newErrors.operator = 'Operator is required'
    }

    if (!formData.state) {
      newErrors.state = 'State is required'
    }

    if (!formData.LGA.trim()) {
      newErrors.LGA = 'LGA is required'
    }

    if (!formData.geopoliticalZone) {
      newErrors.geopoliticalZone = 'Geopolitical zone is required'
    }

    if (!formData.capacity.trim()) {
      newErrors.capacity = 'Capacity is required'
    }

    if (!formData.powerSources) {
      newErrors.powerSources = 'Power sources are required'
    }

    if (!formData.commissioningDates.trim()) {
      newErrors.commissioningDates = 'Commissioning date is required'
    }

    if (!formData.position.lat.trim() || !formData.position.lng.trim()) {
      newErrors.position = 'Coordinates are required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData)
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            category: 'Existing Microgrids',
            microgridName: '',
            description: '',
            type: '',
            operator: '',
            state: '',
            LGA: '',
            geopoliticalZone: '',
            capacity: '',
            size: '',
            powerSources: '',
            commissioningDates: '',
            position: { lat: '', lng: '' },
            source: '',
          })
          setSubmitSuccess(false)
        }, 3000)
      }, 1500)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Submit New Microgrid
        </h1>
        <p className="text-gray-600">
          Contribute to Nigeria&apos;s renewable energy database by submitting
          information about microgrids
        </p>
      </div>

      {submitSuccess && (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-700">
          <div className="flex items-center">
            <svg
              className="mr-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Microgrid submitted successfully! Thank you for your contribution.
            </span>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl bg-white p-6 shadow-md md:p-8"
      >
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Basic Information
            </h2>

            <div className="mb-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              >
                <option value="Existing Microgrids">Existing Microgrids</option>
                <option value="Developing Microgrids">
                  Developing Microgrids
                </option>
                <option value="Potential Microgrids">
                  Potential Microgrids
                </option>
                <option value="Failed Microgrids">Failed Microgrids</option>
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
                placeholder="e.g., Ikot Solar Mini-grid"
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
                placeholder="Brief description of the microgrid"
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
                placeholder="e.g., Solar PV, Hybrid, etc."
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
                placeholder="Organization or individual name"
              />
              {errors.operator && (
                <p className="mt-1 text-sm text-red-500">{errors.operator}</p>
              )}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Location Details
            </h2>

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
                placeholder="e.g., Ikot Ekpene, Chikun, etc."
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
                Coordinates <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="lat"
                    value={formData.position.lat}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                    placeholder="Latitude"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lng"
                    value={formData.position.lng}
                    onChange={handleChange}
                    className={`w-full border px-3 py-2 ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                    placeholder="Longitude"
                  />
                </div>
              </div>
              {errors.position && (
                <p className="mt-1 text-sm text-red-500">{errors.position}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Example: 5.1811, 7.7142 for Ikot Ekpene
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8 border-t border-b border-gray-200 py-8">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Technical Specifications
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${errors.capacity ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="e.g., 10kW, 50kW"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-500">{errors.capacity}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g., 1 hectare, 2 acres"
              />
            </div>

            <div>
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
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Commissioning Information
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
                placeholder="e.g., 2022-06-15 or Q3 2025"
              />
              {errors.commissioningDates && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.commissioningDates}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                For developing/potential microgrids, use expected dates
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Source Information
            </h2>

            <div className="mb-5">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Data Source
              </label>
              <input
                type="text"
                name="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g., REAN Database, Company Report"
              />
              <p className="mt-1 text-xs text-gray-500">
                Where did you get this information?
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="rounded-lg border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`rounded-lg px-6 py-2.5 font-medium text-white transition-colors ${
              isSubmitting
                ? 'cursor-not-allowed bg-teal-400'
                : 'bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Microgrid'
            )}
          </button>
        </div>
      </form>

      <div className="mt-10 rounded-xl border border-teal-100 bg-teal-50 p-6">
        <h3 className="mb-2 text-lg font-semibold text-teal-800">
          Submission Guidelines
        </h3>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li className="flex items-start">
            <svg
              className="mt-0.5 mr-2 h-5 w-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Ensure all required fields (marked with *) are filled</span>
          </li>
          <li className="flex items-start">
            <svg
              className="mt-0.5 mr-2 h-5 w-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Provide accurate and verifiable information</span>
          </li>
          <li className="flex items-start">
            <svg
              className="mt-0.5 mr-2 h-5 w-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              For developing/potential microgrids, include expected
              commissioning dates
            </span>
          </li>
          <li className="flex items-start">
            <svg
              className="mt-0.5 mr-2 h-5 w-5 text-teal-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>Include source information for verification purposes</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
