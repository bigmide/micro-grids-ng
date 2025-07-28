import { useState } from 'react'
import { microgridServiceProviders } from '@/assets/grid-data'

export default function SolarProvidersView() {
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Filter solar suppliers
  const solarSuppliers = microgridServiceProviders
    .filter(
      (category) => category.category === 'Solar Suppliers & Distributors',
    )
    .flatMap((category) => category.data)

  // Filter by search term
  const filteredSuppliers = solarSuppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800 md:text-4xl">
          Solar Suppliers & Distributors in Nigeria
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Find reliable solar equipment suppliers and distributors across
          Nigeria. Connect with providers for your solar projects and energy
          needs.
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="w-full md:w-2/3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search suppliers by name, location or services..."
              className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-teal-500 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute top-3.5 left-3 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex w-full items-center justify-center rounded-lg bg-teal-600 px-6 py-3 font-medium text-white transition-colors hover:bg-teal-700 md:w-auto"
        >
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          {showForm ? 'Hide Form' : 'Register as Supplier'}
        </button>
      </div>

      {/* Registration Form */}
      {showForm && (
        <SupplierRegistrationForm onClose={() => setShowForm(false)} />
      )}

      {/* Statistics Banner */}
      <div className="mb-12 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
          <div className="p-3">
            <div className="text-3xl font-bold">{solarSuppliers.length}+</div>
            <div className="text-sm opacity-90">Registered Suppliers</div>
          </div>
          <div className="p-3">
            <div className="text-3xl font-bold">36</div>
            <div className="text-sm opacity-90">States Covered</div>
          </div>
          <div className="p-3">
            <div className="text-3xl font-bold">120+</div>
            <div className="text-sm opacity-90">Solar Products</div>
          </div>
          <div className="p-3">
            <div className="text-3xl font-bold">15k+</div>
            <div className="text-sm opacity-90">Projects Supported</div>
          </div>
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="mb-16">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Verified Solar Suppliers{' '}
          {filteredSuppliers.length > 0 && `(${filteredSuppliers.length})`}
        </h2>

        {filteredSuppliers.length === 0 ? (
          <div className="py-12 text-center">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">
              No suppliers found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-gray-600">
              We couldn't find any suppliers matching your search. Try different
              keywords or register as a new supplier.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSuppliers.map((supplier, index) => (
              <SupplierCard key={index} supplier={supplier} />
            ))}
          </div>
        )}
      </div>

      {/* How It Works Section */}
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 md:p-8">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          How to Get Listed
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">1</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Submit Your Details
            </h3>
            <p className="text-gray-600">
              Fill out our registration form with your company information and
              services.
            </p>
          </div>

          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">2</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Verification Process
            </h3>
            <p className="text-gray-600">
              Our team will review your application to ensure quality standards.
            </p>
          </div>

          <div className="p-5 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
              <span className="text-2xl font-bold text-teal-800">3</span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              Get Listed
            </h3>
            <p className="text-gray-600">
              Once approved, your company will be visible to thousands of
              customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SupplierCard({ supplier }: { supplier: any }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start">
          <div className="h-16 w-16 rounded-xl border-2 border-dashed bg-gray-200" />
          <div className="ml-4">
            <h3 className="text-xl font-bold text-gray-800">{supplier.name}</h3>
            <div className="mt-1 flex items-center text-gray-600">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{supplier.location}</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-gray-600">{supplier.description}</p>

        <div className="mt-5">
          <h4 className="mb-2 font-medium text-gray-800">
            Products & Services
          </h4>
          <div className="flex flex-wrap gap-2">
            {['Solar Panels', 'Batteries', 'Inverters', 'Installation'].map(
              (service, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700"
                >
                  {service}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button className="min-w-[120px] flex-1 rounded-lg border border-teal-600 bg-white px-4 py-2 font-medium text-teal-600 transition-colors hover:bg-teal-50">
            View Details
          </button>
          <button className="min-w-[120px] flex-1 rounded-lg bg-teal-600 px-4 py-2 font-medium text-white transition-colors hover:bg-teal-700">
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}

function SupplierRegistrationForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    description: '',
    products: '',
    coverage: [] as string[],
    certifications: '',
    yearsExperience: '',
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
    setFormData((prev) => ({ ...prev, [name]: value }))

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
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        console.log('Form submitted:', formData)
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after success
        setTimeout(() => {
          setFormData({
            companyName: '',
            contactName: '',
            email: '',
            phone: '',
            location: '',
            website: '',
            description: '',
            products: '',
            coverage: [],
            certifications: '',
            yearsExperience: '',
          })
          setSubmitSuccess(false)
          onClose()
        }, 3000)
      }, 1500)
    }
  }

  return (
    <div className="mb-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">
            Supplier Registration Form
          </h2>
          <button onClick={onClose} className="text-white hover:text-teal-200">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {submitSuccess ? (
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-800">
            Registration Successful!
          </h3>
          <p className="mb-6 text-gray-600">
            Thank you for registering as a solar supplier. Our team will review
            your application and contact you shortly.
          </p>
          <button
            onClick={onClose}
            className="rounded-lg bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="Your company name"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${errors.contactName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="Full name"
              />
              {errors.contactName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="contact@company.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="+234 800 000 0000"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Location (State/City) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full border px-3 py-2 ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="e.g., Lagos, Abuja, Kano"
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-500">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="https://www.example.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Company Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`w-full border px-3 py-2 ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="Describe your company, services, and expertise"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Products & Services Offered{' '}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="products"
                value={formData.products}
                onChange={handleChange}
                rows={3}
                className={`w-full border px-3 py-2 ${errors.products ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none`}
                placeholder="List the solar products and services you offer"
              />
              {errors.products && (
                <p className="mt-1 text-sm text-red-500">{errors.products}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Coverage Area (States)
              </label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {[
                  'Lagos',
                  'Abuja',
                  'Kano',
                  'Rivers',
                  'Oyo',
                  'Delta',
                  'Enugu',
                  'Others',
                ].map((state) => (
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

            <div>
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
                <option value="1-2">1-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Certifications
              </label>
              <input
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                placeholder="e.g., NABCEP, ISO, etc."
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-gray-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-lg px-8 py-3 font-medium text-white transition-colors ${
                isSubmitting
                  ? 'cursor-not-allowed bg-teal-400'
                  : 'bg-teal-600 hover:bg-teal-700'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
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
                'Submit Registration'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
