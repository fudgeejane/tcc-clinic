import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Patients = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('studentId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterCourse, setFilterCourse] = useState('');
  const [filterYear, setFilterYear] = useState('');

  // Dummy data
  const dummyPatients = [
    {
      id: 1,
      studentId: '2021-0001',
      firstName: 'John',
      middleName: 'Smith',
      lastName: 'Doe',
      course: 'BSIT',
      yearSection: '2-A',
      contact: '09123456789',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      studentId: '2021-0002',
      firstName: 'Jane',
      middleName: '',
      lastName: 'Smith',
      course: 'BSCS',
      yearSection: '3-B',
      contact: '09234567890',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      studentId: '2021-0003',
      firstName: 'Michael',
      middleName: 'James',
      lastName: 'Johnson',
      course: 'BSIT',
      yearSection: '1-C',
      contact: '09345678901',
      email: 'michael.j@example.com'
    },
    {
      id: 4,
      studentId: '2021-0004',
      firstName: 'Sarah',
      middleName: 'Marie',
      lastName: 'Williams',
      course: 'BSCE',
      yearSection: '4-A',
      contact: '09456789012',
      email: 'sarah.w@example.com'
    },
    {
      id: 5,
      studentId: '2021-0005',
      firstName: 'David',
      middleName: '',
      lastName: 'Brown',
      course: 'BSEE',
      yearSection: '2-B',
      contact: '09567890123',
      email: 'david.b@example.com'
    }
  ];

  // Filter and sort patients
  const filteredAndSortedPatients = dummyPatients
    .filter(patient => {
      const matchesSearch = 
        `${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = filterCourse ? patient.course === filterCourse : true;
      const matchesYear = filterYear ? patient.yearSection.startsWith(filterYear) : true;

      return matchesSearch && matchesCourse && matchesYear;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`h-4 w-4 ml-1 ${sortField === field ? 'text-[#3b4cca]' : 'text-gray-400'}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {sortField === field && sortDirection === 'asc' ? (
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      ) : (
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
      )}
    </svg>
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-500 mt-1">Manage and track patient information</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(true)}
          className="px-6 py-3 bg-[#3b4cca] text-white rounded-lg hover:bg-[#3b4cca]/90 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Patient
        </motion.button>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or student ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 shadow-sm"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
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
        <div>
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 shadow-sm"
          >
            <option value="">All Courses</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
            <option value="BSCE">BSCE</option>
            <option value="BSEE">BSEE</option>
          </select>
        </div>
        <div>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 shadow-sm"
          >
            <option value="">All Years</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-500">
            {filteredAndSortedPatients.length} {filteredAndSortedPatients.length === 1 ? 'patient' : 'patients'} found
          </span>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('studentId')}
                >
                  <div className="flex items-center">
                    Student ID
                    <SortIcon field="studentId" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('firstName')}
                >
                  <div className="flex items-center">
                    Name
                    <SortIcon field="firstName" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('course')}
                >
                  <div className="flex items-center">
                    Course
                    <SortIcon field="course" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('yearSection')}
                >
                  <div className="flex items-center">
                    Year & Section
                    <SortIcon field="yearSection" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('contact')}
                >
                  <div className="flex items-center">
                    Contact
                    <SortIcon field="contact" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedPatients.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">No patients found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.studentId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${patient.firstName} ${patient.middleName ? patient.middleName + ' ' : ''}${patient.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.course}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.yearSection}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-3">
                        <button className="text-[#3b4cca] hover:text-[#3b4cca]/80 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                          </svg>
                        </button>
                        <button className="text-red-500 hover:text-red-600 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Patient</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-8">
              {/* Personal Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b4cca]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter student ID"
                    />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Middle Name (Optional)</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                        placeholder="Enter middle name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors">
                      <option value="">Select Course</option>
                      <option value="BSIT">BSIT</option>
                      <option value="BSCS">BSCS</option>
                      <option value="BSCE">BSCE</option>
                      <option value="BSEE">BSEE</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors">
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors">
                      <option value="">Select Section</option>
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sex</label>
                    <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors">
                      <option value="">Select Sex</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter height"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter weight"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter complete address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter contact number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Conditions Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b4cca]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900">Medical Conditions</h3>
                </div>
                <p className="text-sm text-gray-500">Have or subject to (If Yes, Check the box and elaborate)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Faint Spell', 'Easy Fatigue', 'Chest Pain', 'Palpitation',
                    'Convulsion', 'Nervousness', 'Abdominal Pain', 'Frequent Cough',
                    'Shortness of Breath', 'Headache', 'Frequent Fever', 'Sore Throat',
                    'Others'
                  ].map((condition) => (
                    <div key={condition} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                      />
                      <label className="text-sm text-gray-700">{condition}</label>
                    </div>
                  ))}
                </div>
                {/* Medical Conditions Comments */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments for Medical Conditions</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors min-h-[100px]"
                    placeholder="Please provide any additional details about the medical conditions checked above..."
                  />
                </div>
              </div>

              {/* Illnesses Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b4cca]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900">Illnesses</h3>
                </div>
                <p className="text-sm text-gray-500">Have or subject to (If Yes, Check the box and elaborate)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Liver', 'Recurrent Diarrhea', 'Hypertension', 'Hypotension',
                    'Diabetes', 'Hernia', 'Kidney', 'Allergy', 'Lungs', 'Heart',
                    'Eye, Ear, Nose, & Throat', 'Measles', 'Mumps', 'Whooping Cough'
                  ].map((illness) => (
                    <div key={illness} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                      />
                      <label className="text-sm text-gray-700">{illness}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                    />
                    <label className="text-sm text-gray-700">Any condition now requiring regular medication?</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                    />
                    <label className="text-sm text-gray-700">Any restriction of activity for medical reasons?</label>
                  </div>
                </div>
                {/* Illnesses Comments */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments for Illnesses</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors min-h-[100px]"
                    placeholder="Please provide any additional details about the illnesses checked above..."
                  />
                </div>
              </div>

              {/* Medical History Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#3b4cca]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900">Medical History</h3>
                </div>
                <p className="text-sm text-gray-500">Have or subject to (If Yes, Check the box and elaborate)</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Asthma (Date of last attack)', 'Any allergic reaction to penicillin or any other medication?',
                    'Any allergic reaction to food or any substances?', 'Convulsions or Seizures',
                    'Heart Disease', 'Kidney or Urinary Problems (Specify)', 'Other Psycho-Emotional Problems',
                    'Surgeries Undertaken (Specify)', 'Diabetes', 'Any other active medical conditions (Specify)'
                  ].map((history) => (
                    <div key={history} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                      />
                      <label className="text-sm text-gray-700">{history}</label>
                    </div>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    'Do you currently have special needs that can affect your academic performance or social adjustment in college? (Specify)',
                    'Physical Limitations (e.g. Cerebral palsy, heart problems, paraplegia, other)',
                    'Emotional or Behavioural Conditions (e.g. anxiety, depression, personality problems, other)',
                    'Conditions related to attention or concentration (e.g. ADHD, other)',
                    'Ongoing or Long-standing Medical Conditions (e.g. seizures, epilepsy, G6PD deficiency, other)',
                    'Are you receiving professional services for any of the conditions listed above?',
                    'Are you currently taking any medication?'
                  ].map((item) => (
                    <div key={item} className="flex items-center space-x-3">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#3b4cca] focus:ring-[#3b4cca] transition-colors" 
                      />
                      <label className="text-sm text-gray-700">{item}</label>
                    </div>
                  ))}
                </div>
                {/* Medical History Comments */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments for Medical History</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors min-h-[100px]"
                    placeholder="Please provide any additional details about the medical history checked above..."
                  />
                </div>
              </div>

              {/* Data Privacy Consent */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-600 text-center">
                  All the information given will be treated with utmost confidentiality
                  and for TCC Medical and Dental Clinic records only.
                </p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="px-6 py-3 bg-[#3b4cca] text-white rounded-lg hover:bg-[#3b4cca]/90 transition-colors shadow-lg hover:shadow-xl"
                >
                  Save Patient
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Patients; 