import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = ({ isOpen, onToggle }) => {
  return (
    <div className={`fixed left-0 top-0 h-screen bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && <h1 className="text-2xl font-bold text-[#3b4cca]">Clinic</h1>}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-[#3b4cca]/10 transition-colors"
        >
          {isOpen ? (
            <i className="bi bi-chevron-double-left text-xl"></i>
          ) : (
            <i className="bi bi-chevron-double-right text-xl"></i>
          )}
        </button>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-house text-xl"></i>
              </div>
              {isOpen && <span>Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/view-patients"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-people text-xl"></i>
              </div>
              {isOpen && <span>Patients</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/inventory"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-box-seam text-xl"></i>
              </div>
              {isOpen && <span>Inventory</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/employees"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-person-badge text-xl"></i>
              </div>
              {isOpen && <span>Employees</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/analytics"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-graph-up text-xl"></i>
              </div>
              {isOpen && <span>Analytics</span>}
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#3b4cca]/10 rounded-lg transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="bi bi-gear text-xl"></i>
              </div>
              {isOpen && <span>Settings</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 