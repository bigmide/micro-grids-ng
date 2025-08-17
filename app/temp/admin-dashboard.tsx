// File: src/pages/AdminDashboard.tsx
import React, { useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ViewMicrogridSubmission from './ViewMicrogridSubmission'
import EditMicrogridSubmission from './EditMicrogridSubmission'
import ViewSupplierApplication from './ViewSupplierApplication'
import EditSupplierApplication from './EditSupplierApplication'
import { useNavigate } from 'react-router'

// Mock data
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
    description: 'Leading provider of solar panels and installation services with 10 years experience',
    products: 'Solar panels, inverters, batteries, installation services',
    coverage: ['Lagos', 'Oyo', 'Abuja'],
    certifications: 'NABCEP, SON Certified',
    yearsExperience: '10+ years',
    submittedAt: '2023-09-08T11:20:00Z',
    status: 'pending',
  },
  {
    id: 'sup-002',
    companyName: 'GreenTech Distributors',
    contactName: 'Chioma Okonkwo',
    email: 'chioma@greentechdist.com',
    phone: '+234 902 987 6543',
    location: 'Port Harcourt, Enugu',
    website: 'https://greentechdist.com',
    description: 'Distributor of tier-1 solar equipment across southern Nigeria',
    products: 'Solar panels, charge controllers, mounting systems',
    coverage: ['Rivers', 'Enugu', 'Delta'],
    certifications: 'ISO 9001, IEC Certified',
    yearsExperience: '5 years',
    submittedAt: '2023-09-11T15:40:00Z',
    status: 'approved',
  },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState(0)
  const [microgridSubmissions, setMicrogridSubmissions] = useState(mockMicrogridSubmissions)
  const [supplierApplications, setSupplierApplications] = useState(mockSupplierApplications)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [viewMode, setViewMode] = useState<'list' | 'view' | 'edit'>('list')
  const [itemType, setItemType] = useState<'microgrid' | 'supplier' | null>(null)
  const navigate = useNavigate()

  const handleMicrogridAction = (id: string, action: 'approve' | 'reject' | 'delete') => {
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

  const handleSupplierAction = (id: string, action: 'approve' | 'reject' | 'delete') => {
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

  const handleViewItem = (item: any, type: 'microgrid' | 'supplier') => {
    setSelectedItem(item)
    setItemType(type)
    setViewMode('view')
  }

  const handleEditItem = (item: any, type: 'microgrid' | 'supplier') => {
    setSelectedItem(item)
    setItemType(type)
    setViewMode('edit')
  }

  const handleSaveMicrogrid = (updatedData: any) => {
    setMicrogridSubmissions((prev) => prev.map((item) => (item.id === updatedData.id ? updatedData : item)))
    setViewMode('view')
  }

  const handleSaveSupplier = (updatedData: any) => {
    setSupplierApplications((prev) => prev.map((item) => (item.id === updatedData.id ? updatedData : item)))
    setViewMode('view')
  }

  const handleBackToList = () => {
    setViewMode('list')
    setSelectedItem(null)
  }

  if (viewMode === 'view' && selectedItem && itemType) {
    if (itemType === 'microgrid') {
      return (
        <ViewMicrogridSubmission
          submission={selectedItem}
          onEdit={() => setViewMode('edit')}
          onBack={handleBackToList}
          onAction={handleMicrogridAction}
        />
      )
    } else {
      return (
        <ViewSupplierApplication
          application={selectedItem}
          onEdit={() => setViewMode('edit')}
          onBack={handleBackToList}
          onAction={handleSupplierAction}
        />
      )
    }
  }

  if (viewMode === 'edit' && selectedItem && itemType) {
    if (itemType === 'microgrid') {
      return (
        <EditMicrogridSubmission
          submission={selectedItem}
          onSave={handleSaveMicrogrid}
          onCancel={() => setViewMode('view')}
        />
      )
    } else {
      return (
        <EditSupplierApplication
          application={selectedItem}
          onSave={handleSaveSupplier}
          onCancel={() => setViewMode('view')}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Microgrid Administration Portal</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-1 text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList className="flex border-b border-gray-200">
            <Tab
              className={`cursor-pointer px-6 py-4 text-sm font-medium ${
                activeTab === 0 ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Microgrid Submissions
            </Tab>
            <Tab
              className={`cursor-pointer px-6 py-4 text-sm font-medium ${
                activeTab === 1 ? 'border-b-2 border-teal-600 text-teal-600' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Supplier Applications
            </Tab>
          </TabList>

          <TabPanel>
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Microgrid Submissions ({microgridSubmissions.length})
                </h2>
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
                      <tr
                        key={submission.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleViewItem(submission, 'microgrid')}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{submission.microgridName}</div>
                          <div className="text-sm text-gray-500">{submission.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{submission.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {submission.LGA}, {submission.state}
                          </div>
                          <div className="text-sm text-gray-500">{submission.geopoliticalZone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{submission.capacity}</td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                          {new Date(submission.submittedAt).toLocaleDateString()}
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
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 text-sm font-medium whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem(submission, 'microgrid')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleMicrogridAction(submission.id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleMicrogridAction(submission.id, 'reject')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
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

          <TabPanel>
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">
                  Supplier Applications ({supplierApplications.length})
                </h2>
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
                      <tr
                        key={application.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleViewItem(application, 'supplier')}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{application.companyName}</div>
                          <div className="text-sm text-gray-500">{application.website}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{application.contactName}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{application.location}</div>
                          <div className="mt-1 text-xs text-gray-500">{application.coverage.join(', ')}</div>
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                          {application.yearsExperience}
                        </td>
                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                          {new Date(application.submittedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                              application.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 text-sm font-medium whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditItem(application, 'supplier')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleSupplierAction(application.id, 'approve')}
                              className="text-green-600 hover:text-green-900"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleSupplierAction(application.id, 'reject')}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
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
      </main>
    </div>
  )
}
