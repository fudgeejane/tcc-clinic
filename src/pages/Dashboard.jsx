import React from 'react';
import { motion } from 'framer-motion';

const statCards = [
  {
    label: 'Employees',
    value: 0,
    icon: (
      <svg className="w-10 h-10 text-indigo-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0zm6 4v2a2 2 0 01-2 2h-1.5M3 16v2a2 2 0 002 2h1.5" /></svg>
    ),
  },
  {
    label: 'Patients',
    value: 0,
    icon: (
      <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
    ),
  },
  {
    label: 'Inventory Stock',
    value: 369,
    icon: (
      <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h16a1 1 0 001-1V7M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
];

const expiredItems = [
  'Paracetamol',
  'Loperamide',
  'Cough Syrup',
  'Loperamide',
  'Antacid Tablets',
  'Cough Syrup',
];

const lowStockItems = [
  'Ibuprofen',
  'Vitamin C',
  'Amoxicillin',
  'Cetirizine',
];

const nearExpiryItems = [
  'Multivitamins',
  'Hydrocortisone Cream',
  'Salbutamol',
  'Antihistamine',
];

const Section = ({ title, items, bgColor }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300"
  >
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-8 border-b pb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: idx * 0.1 }}
          className={`rounded-lg p-6 flex items-center justify-between shadow-md ${bgColor} hover:scale-105 transition-transform duration-200`}
        >
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{item}</div>
            <div className="text-gray-700 font-medium">{title === 'Almost Out of Stock' ? 'Low Stock' : title === 'Items Nearly Expiry' ? 'Expiring Soon' : 'Expired'}</div>
          </div>
          <button className="text-gray-600 hover:text-red-500 text-2xl font-bold transition-colors duration-200">&times;</button>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center justify-between bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div>
              <div className="text-4xl font-bold text-gray-800">{card.value}</div>
              <div className="text-gray-500 text-lg mt-2 font-medium">{card.label}</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-200">{card.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Expired Items Section */}
      <Section title="Expired Items" items={expiredItems} bgColor="bg-red-100 hover:bg-red-200" />
      {/* Almost Out of Stock Section */}
      <Section title="Almost Out of Stock" items={lowStockItems} bgColor="bg-yellow-100 hover:bg-yellow-200" />
      {/* Items Nearly Expiry Section */}
      <Section title="Items Nearly Expiry" items={nearExpiryItems} bgColor="bg-orange-100 hover:bg-orange-200" />
    </div>
  );
};

export default Dashboard; 