import React, { useState, useEffect } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

// Mock data - in a real app, this would come from an API
const mockMicrogridSubmissions = [
  {
    id: 'mg-001',
    category: 'Existing Microgrids',
    microgridName: 'Lekki Solar Project',
    description: '20kW solar system for residential community',
    type: 'Solar PV',
    operator: 'SolarTech Nigeria',
    state: 'Lagos',
    LGA: 'Lekki',
    geopoliticalZone: 'South West',
    capacity: '20kW',
    size: '1.2 hectares',
    powerSources: 'Solar',
    commissioningDates: '2023-08-15',
    position: { lat: '6.4365', lng: '3.4522' },
    source: 'Company Website',
    submittedAt: '2023-09-10T14:30:00Z',
    status: 'pending',
  },
  {
    id: 'mg-002',
    category: 'Developing Microgrids',
    microgridName: 'Jos Hybrid Plant',
    description: 'Hybrid system for agricultural processing',
    type: 'Hybrid (Solar/Diesel)',
    operator: 'GreenFields AgriPower',
    state: 'Plateau',
    LGA: 'Jos North',
    geopoliticalZone: 'North Central',
    capacity: '50kW',
    size: '2.5 hectares',
    powerSources: 'Solar, Diesel',
    commissioningDates: '2024-03-01 (Expected)',
    position: { lat: '9.8965', lng: '8.8583' },
    source: 'Email Submission',
    submittedAt: '2023-09-05T09:15:00Z',
    status: 'approved',
  },
  {
    id: 'mg-003',
    category: 'Potential Microgrids',
    microgridName: 'Calabar Tidal Project',
    description: 'Feasibility study for tidal energy microgrid',
    type: 'Hybrid (Solar/Tidal)',
    operator: 'Coastal Energy Solutions',
    state: 'Cross River',
    LGA: 'Calabar Municipal',
    geopoliticalZone: 'South South',
    capacity: '200kW (Planned)',
    size: '5 hectares',
    powerSources: 'Tidal, Solar',
    commissioningDates: '2026-12-01 (Target)',
    position: { lat: '4.9517', lng: '8.3222' },
    source: 'Research Paper',
    submittedAt: '2023-09-12T16:45:00Z',
    status: 'rejected',
  },
]

const mockSupplierApplications = [
  {
    id: 'sup-001',
    companyName: 'Solar Solutions NG',
    contactName: 'Adebayo Johnson',
    email: 'adebayo@solarsolutions.ng',
    phone: '+234 803 123 4567',
    location: 'Lagos, Ibadan, Abuja',
    website: 'https://solarsolutions.ng',
    description:
      'Leading provider of solar panels and installation services with 10 years experience',
    products: 'Solar panels, inverters, batteries, installation services',
    coverage: ['Lagos', 'Oyo', 'Abuja'],
    certifications: 'NABCEP, SON Certified',
    yearsExperience: '10+ years',
    submittedAt: '2023-09-08T11:20:00Z',
    status: 'approved',
  },
  {
    id: 'sup-002',
    companyName: 'GreenTech Distributors',
    contactName: 'Chioma Okonkwo',
    email: 'chioma@greentechdist.com',
    phone: '+234 902 987 6543',
    location: 'Port Harcourt, Enugu',
    website: 'https://greentechdist.com',
    description:
      'Distributor of tier-1 solar equipment across southern Nigeria',
    products: 'Solar panels, charge controllers, mounting systems',
    coverage: ['Rivers', 'Enugu', 'Delta'],
    certifications: 'ISO 9001, IEC Certified',
    yearsExperience: '5 years',
    submittedAt: '2023-09-11T15:40:00Z',
    status: 'pending',
  },
  {
    id: 'sup-003',
    companyName: 'VoltMax Energy',
    contactName: 'Emeka Chukwu',
    email: 'emeka@voltmaxenergy.com',
    phone: '+234 701 234 5678',
    location: 'Kano, Kaduna',
    website: 'https://voltmaxenergy.com',
    description:
      'Specializing in lithium batteries and solar systems for northern Nigeria',
    products: 'Lithium batteries, inverters, solar kits',
    coverage: ['Kano', 'Kaduna', 'Katsina', 'Sokoto'],
    certifications: 'UL Certified, SONCAP',
    yearsExperience: '3 years',
    submittedAt: '2023-09-09T10:05:00Z',
    status: 'pending',
  },
]

export function AdminDashboardView() {
  const [activeTab, setActiveTab] = useState(0)
  const [microgridSubmissions, setMicrogridSubmissions] = useState(
    mockMicrogridSubmissions,
  )
  const [supplierApplications, setSupplierApplications] = useState(
    mockSupplierApplications,
  )
  const [stats, setStats] = useState({
    pendingMicrogrids: 0,
    approvedMicrogrids: 0,
    pendingSuppliers: 0,
    approvedSuppliers: 0,
  })

  useEffect(() => {
    // Calculate statistics
    const pendingMicrogrids = microgridSubmissions.filter(
      (m) => m.status === 'pending',
    ).length
    const approvedMicrogrids = microgridSubmissions.filter(
      (m) => m.status === 'approved',
    ).length
    const pendingSuppliers = supplierApplications.filter(
      (s) => s.status === 'pending',
    ).length
    const approvedSuppliers = supplierApplications.filter(
      (s) => s.status === 'approved',
    ).length

    setStats({
      pendingMicrogrids,
      approvedMicrogrids,
      pendingSuppliers,
      approvedSuppliers,
    })
  }, [microgridSubmissions, supplierApplications])

  const handleMicrogridAction = (
    id: string,
    action: 'approve' | 'reject' | 'delete',
  ) => {
    setMicrogridSubmissions((prev) => {
      if (action === 'delete') {
        return prev.filter((submission) => submission.id !== id)
      }

      return prev.map((submission) => {
        if (submission.id === id) {
          return {
            ...submission,
            status: action === 'approve' ? 'approved' : 'rejected',
          }
        }
        return submission
      })
    })
  }

  const handleSupplierAction = (
    id: string,
    action: 'approve' | 'reject' | 'delete',
  ) => {
    setSupplierApplications((prev) => {
      if (action === 'delete') {
        return prev.filter((application) => application.id !== id)
      }

      return prev.map((application) => {
        if (application.id === id) {
          return {
            ...application,
            status: action === 'approve' ? 'approved' : 'rejected',
          }
        }
        return application
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Microgrid Administration Portal
          </h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 text-gray-500 hover:text-gray-700">
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-0 right-0 inline-flex translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs leading-none font-bold text-white">
                  3
                </span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-xl border-2 border-dashed bg-gray-200" />
              <span className="ml-2 font-medium text-gray-700">Admin User</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Dashboard Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-teal-100 p-3">
                <svg
                  className="h-6 w-6 text-teal-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Microgrids</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingMicrogrids}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-green-100 p-3">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved Microgrids</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.approvedMicrogrids}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-amber-100 p-3">
                <svg
                  className="h-6 w-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingSuppliers}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-blue-100 p-3">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Approved Suppliers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.approvedSuppliers}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-xl bg-white shadow">
          <Tabs
            selectedIndex={activeTab}
            onSelect={(index) => setActiveTab(index)}
          >
            <TabList className="flex border-b border-gray-200">
              <Tab
                className={`cursor-pointer px-6 py-4 text-sm font-medium ${
                  activeTab === 0
                    ? 'border-b-2 border-teal-600 text-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Microgrid Submissions
              </Tab>
              <Tab
                className={`cursor-pointer px-6 py-4 text-sm font-medium ${
                  activeTab === 1
                    ? 'border-b-2 border-teal-600 text-teal-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Supplier Applications
              </Tab>
            </TabList>

            {/* Microgrid Submissions Panel */}
            <TabPanel>
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    Microgrid Submissions ({microgridSubmissions.length})
                  </h2>
                  <div className="flex space-x-2">
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                      Export CSV
                    </button>
                    <button className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700">
                      Add New
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Capacity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Submitted
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {microgridSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {submission.microgridName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {submission.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {submission.LGA}, {submission.state}
                            </div>
                            <div className="text-sm text-gray-500">
                              {submission.geopoliticalZone}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            {submission.capacity}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            {new Date(
                              submission.submittedAt,
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
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
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleMicrogridAction(
                                    submission.id,
                                    'approve',
                                  )
                                }
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleMicrogridAction(submission.id, 'reject')
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  handleMicrogridAction(submission.id, 'delete')
                                }
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>

            {/* Supplier Applications Panel */}
            <TabPanel>
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">
                    Supplier Applications ({supplierApplications.length})
                  </h2>
                  <div className="flex space-x-2">
                    <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
                      Export CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Company
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Contact
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Experience
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Submitted
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {supplierApplications.map((application) => (
                        <tr key={application.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {application.companyName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.website}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {application.contactName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {application.location}
                            </div>
                            <div className="mt-1 text-xs text-gray-500">
                              {application.coverage.join(', ')}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            {application.yearsExperience}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                            {new Date(
                              application.submittedAt,
                            ).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                                application.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {application.status.charAt(0).toUpperCase() +
                                application.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  handleSupplierAction(
                                    application.id,
                                    'approve',
                                  )
                                }
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  handleSupplierAction(application.id, 'reject')
                                }
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() =>
                                  handleSupplierAction(application.id, 'delete')
                                }
                                className="text-gray-600 hover:text-gray-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mt-1 mr-3 rounded-full bg-green-100 p-2">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  You approved{' '}
                  <span className="text-teal-600">Kaduna Hybrid Plant</span>{' '}
                  microgrid
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-3 rounded-full bg-yellow-100 p-2">
                <svg
                  className="h-5 w-5 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  <span className="text-teal-600">SolarTech Distributors</span>{' '}
                  submitted a new application
                </p>
                <p className="text-xs text-gray-500">Yesterday, 3:45 PM</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mt-1 mr-3 rounded-full bg-red-100 p-2">
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  You rejected{' '}
                  <span className="text-teal-600">Makurdi Agri-Power Grid</span>{' '}
                  submission
                </p>
                <p className="text-xs text-gray-500">September 12, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
