// File: src/components/EditSupplierApplication.tsx
import React, { useState } from 'react'

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

interface EditSupplierApplicationProps {
  application: SupplierApplication
  onSave: (updatedData: SupplierApplication) => void
  onCancel: () => void
}

const experienceOptions = ['1-2 years', '3-5 years', '6-10 years', '10+ years']

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

export default function EditSupplierApplication({
  application,
  onSave,
  onCancel,
}: EditSupplierApplicationProps) {
  const [formData, setFormData] = useState(application)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target

    setFormData((prev) => {
      if (checked) {
        return { ...prev, coverage: [...prev.coverage, value] }
      } else {
        return {
          ...prev,
          coverage: prev.coverage.filter((item) => item !== value),
        }
      }
    })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.companyName.trim())
      newErrors.companyName = 'Company name is required'
    if (!formData.contactName.trim())
      newErrors.contactName = 'Contact name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.description.trim())
      newErrors.description = 'Description is required'
    if (!formData.products.trim())
      newErrors.products = 'Products/services are required'

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
          Edit Supplier Application
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.contactName && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.contactName}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-500">{errors.location}</p>
                )}
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Years of Experience
                </label>
                <select
                  name="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="">Select years</option>
                  {experienceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-5">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Certifications
                </label>
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-6">
            <div className="rounded-lg bg-gray-50 p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Coverage Areas
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {nigerianStates.map((state) => (
                  <div key={state} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`state-${state}`}
                      value={state}
                      checked={formData.coverage.includes(state)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label
                      htmlFor={`state-${state}`}
                      className="ml-2 text-sm text-gray-700"
                    >
                      {state}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Company Description <span className="text-red-500">*</span>
              </h2>
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

            <div className="rounded-lg bg-gray-50 p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Products & Services <span className="text-red-500">*</span>
              </h2>
              <textarea
                name="products"
                value={formData.products}
                onChange={handleChange}
                rows={3}
                className={`w-full border px-3 py-2 ${errors.products ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
              />
              {errors.products && (
                <p className="mt-1 text-sm text-red-500">{errors.products}</p>
              )}
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
