import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Employees = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('employeeId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterDepartment, setFilterDepartment] = useState('');

  // Dummy data
  const dummyEmployees = [
    {
      id: 1,
      employeeId: 'EMP001',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Doctor',
      department: 'Medical'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      firstName: 'Jane',
      lastName: 'Smith',
      position: 'Nurse',
      department: 'Nursing'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      firstName: 'Michael',
      lastName: 'Johnson',
      position: 'Pharmacist',
      department: 'Pharmacy'
    }
  ];

  // Filter and sort employees
  const filteredAndSortedEmployees = dummyEmployees
    .filter(employee => {
      const matchesSearch = 
        `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = filterDepartment ? employee.department === filterDepartment : true;

      return matchesSearch && matchesDepartment;
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
          <h1 className="text-3xl font-bold text-gray-900">Employee Records</h1>
          <p className="text-gray-500 mt-1">Manage and track employee information</p>
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
          Add New Employee
        </motion.button>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name or employee ID..."
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
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 shadow-sm"
          >
            <option value="">All Departments</option>
            <option value="Medical">Medical</option>
            <option value="Nursing">Nursing</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        <div className="flex items-center justify-end">
          <span className="text-sm text-gray-500">
            {filteredAndSortedEmployees.length} {filteredAndSortedEmployees.length === 1 ? 'employee' : 'employees'} found
          </span>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('employeeId')}
                >
                  <div className="flex items-center">
                    Employee ID
                    <SortIcon field="employeeId" />
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
                  onClick={() => handleSort('position')}
                >
                  <div className="flex items-center">
                    Position
                    <SortIcon field="position" />
                  </div>
                </th>
                <th 
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('department')}
                >
                  <div className="flex items-center">
                    Department
                    <SortIcon field="department" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg font-medium">No employees found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.employeeId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {`${employee.firstName} ${employee.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
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

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                  placeholder="Enter employee ID"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                    placeholder="Enter first name"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors" 
                  placeholder="Enter position"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#3b4cca] focus:ring-2 focus:ring-[#3b4cca]/20 transition-colors">
                  <option value="">Select Department</option>
                  <option value="Medical">Medical</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#3b4cca] text-white rounded-lg hover:bg-[#3b4cca]/90 transition-colors"
                >
                  Add Employee
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Employees; 