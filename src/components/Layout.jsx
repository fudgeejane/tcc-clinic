import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
      <Header isSidebarOpen={isSidebarOpen} />
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-20'} pt-16`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 